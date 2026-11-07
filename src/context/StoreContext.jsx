import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useStorage } from '../hooks/useStorage.js';
import { getProduct } from '../data/products.js';
import { SHIPPING_FEE, SHIPPING_FREE_OVER } from '../utils/format.js';

const StoreContext = createContext(null);
export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }) {
  const [cart, setCart] = useStorage('bl_cart', []);               // [{ id, qty }]  localStorage
  const [wishlist, setWishlist] = useStorage('bl_wishlist', []);   // [id]           localStorage
  const [recent, setRecent] = useStorage('bl_recent', [], 'session'); // [id]        sessionStorage
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const addToCart = useCallback((id, qty = 1) => {
    const product = getProduct(id);
    setCart((c) => {
      const found = c.find((i) => i.id === id);
      const next = Math.min((found?.qty || 0) + qty, product.stock);
      return found ? c.map((i) => (i.id === id ? { ...i, qty: next } : i)) : [...c, { id, qty: next }];
    });
    setToast(`${product.name} added to cart`);
  }, [setCart]);

  const setQty = useCallback((id, qty) => {
    const max = getProduct(id).stock;
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(qty, max)) } : i)));
  }, [setCart]);

  const removeFromCart = useCallback((id) => setCart((c) => c.filter((i) => i.id !== id)), [setCart]);
  const clearCart = useCallback(() => setCart([]), [setCart]);

  const toggleWishlist = useCallback((id) => {
    setToast(wishlist.includes(id) ? 'Removed from wishlist' : 'Saved to wishlist');
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  }, [wishlist, setWishlist]);

  const trackView = useCallback((id) => {
    setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 4));
  }, [setRecent]);

  const totals = useMemo(() => {
    const lines = cart.map((i) => ({ ...i, product: getProduct(i.id) })).filter((l) => l.product);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.qty * l.product.price, 0);
    const shipping = subtotal === 0 || subtotal >= SHIPPING_FREE_OVER ? 0 : SHIPPING_FEE;
    return { lines, count, subtotal, shipping, total: subtotal + shipping };
  }, [cart]);

  const value = {
    cart, wishlist, recent, totals, cartOpen, setCartOpen, toast,
    addToCart, setQty, removeFromCart, clearCart, toggleWishlist, trackView,
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
