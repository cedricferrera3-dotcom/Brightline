import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice } from '../utils/format.js';
import QuantityStepper from './QuantityStepper.jsx';
import EmptyState from './EmptyState.jsx';
import ProductImage from './ProductImage.jsx';

export default function CartDrawer() {
  const { cartOpen, setCartOpen, totals, setQty, removeFromCart } = useStore();

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setCartOpen(false);
    if (cartOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cartOpen, setCartOpen]);

  return (
    <>
      <div className={`scrim ${cartOpen ? 'open' : ''}`} onClick={() => setCartOpen(false)} />
      <aside className={`drawer ${cartOpen ? 'open' : ''}`} aria-label="Shopping cart" aria-hidden={!cartOpen}>
        <div className="drawer-head">
          <h2>Your cart ({totals.count})</h2>
          <button type="button" className="icon-btn" onClick={() => setCartOpen(false)} aria-label="Close cart">✕</button>
        </div>
        {totals.lines.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            text="Add an appliance and it will show up here."
            action={<Link className="btn btn-primary" to="/products" onClick={() => setCartOpen(false)}>Browse products</Link>}
          />
        ) : (
          <>
            <ul className="drawer-list">
              {totals.lines.map(({ id, qty, product }) => (
                <li key={id} className="line">
                  <ProductImage product={product} />
                  <div>
                    <h3>{product.name}</h3>
                    <p className="muted">{formatPrice(product.price)}</p>
                    <QuantityStepper value={qty} max={product.stock} label={product.name} onChange={(n) => setQty(id, n)} />
                  </div>
                  <div className="line-end">
                    <strong>{formatPrice(qty * product.price)}</strong>
                    <button type="button" className="link-btn" onClick={() => removeFromCart(id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="drawer-foot">
              <dl className="totals">
                <div><dt>Subtotal</dt><dd>{formatPrice(totals.subtotal)}</dd></div>
                <div><dt>Shipping</dt><dd>{totals.shipping ? formatPrice(totals.shipping) : 'Free'}</dd></div>
                <div className="grand"><dt>Total</dt><dd>{formatPrice(totals.total)}</dd></div>
              </dl>
              <Link className="btn btn-primary btn-block" to="/checkout" onClick={() => setCartOpen(false)}>Checkout</Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
