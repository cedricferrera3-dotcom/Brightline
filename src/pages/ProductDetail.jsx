import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, products } from '../data/products.js';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice } from '../utils/format.js';
import ProductImage from '../components/ProductImage.jsx';
import QuantityStepper from '../components/QuantityStepper.jsx';
import ProductCard from '../components/ProductCard.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProduct(id);
  const { addToCart, wishlist, toggleWishlist, trackView, recent, setCartOpen } = useStore();
  const [qty, setQty] = useState(1);

  useEffect(() => { setQty(1); if (product) trackView(product.id); window.scrollTo(0, 0); }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!product) {
    return <div className="container section"><EmptyState title="Product not found" text="It may have been removed." action={<Link className="btn btn-primary" to="/products">Back to products</Link>} /></div>;
  }

  const saved = wishlist.includes(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const viewed = recent.filter((r) => r !== product.id).map(getProduct).filter(Boolean).slice(0, 3);

  return (
    <div className="container section">
      <nav aria-label="Breadcrumb" className="crumbs">
        <Link to="/">Home</Link> / <Link to={`/products?cat=${product.category}`}>{product.category}</Link> / <span>{product.name}</span>
      </nav>

      <article className="pdp">
        <div className="pdp-media"><ProductImage product={product} eager /></div>
        <div className="pdp-info">
          <p className="muted">{product.brand}</p>
          <h1>{product.name}</h1>
          <p className="rating">★ {product.rating} <span className="muted">· {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span></p>
          <p className="price big">{formatPrice(product.price)}</p>
          <p>{product.description}</p>
          <h2>Key features</h2>
          <ul className="features">{product.features.map((f) => <li key={f}>{f}</li>)}</ul>

          <div className="buy-row">
            <QuantityStepper value={qty} max={Math.max(product.stock, 1)} label={product.name} onChange={(n) => setQty(Math.max(1, n))} />
            <button type="button" className="btn btn-primary btn-lg grow" disabled={product.stock === 0}
              onClick={() => { addToCart(product.id, qty); setCartOpen(true); }}>
              {product.stock === 0 ? 'Sold out' : 'Add to cart'}
            </button>
            <button type="button" className={`icon-btn bordered ${saved ? 'on' : ''}`} aria-pressed={saved}
              aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'} onClick={() => toggleWishlist(product.id)}>
              {saved ? '♥' : '♡'}
            </button>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section" aria-labelledby="rel">
          <h2 id="rel">More in {product.category}</h2>
          <div className="grid">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}
      {viewed.length > 0 && (
        <aside className="section" aria-labelledby="rec">
          <h2 id="rec">Recently viewed</h2>
          <div className="grid">{viewed.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </aside>
      )}
    </div>
  );
}
