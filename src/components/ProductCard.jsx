import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice } from '../utils/format.js';
import ProductImage from './ProductImage.jsx';

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const saved = wishlist.includes(product.id);
  const soldOut = product.stock === 0;

  return (
    <article className="card">
      <div className="card-media">
        <Link to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
          <ProductImage product={product} />
        </Link>
        {product.badge && <span className="badge">{product.badge}</span>}
        <button
          type="button"
          className={`icon-btn wish ${saved ? 'on' : ''}`}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          onClick={() => toggleWishlist(product.id)}
        >
          {saved ? '♥' : '♡'}
        </button>
      </div>
      <div className="card-body">
        <p className="muted">{product.brand} · {product.category}</p>
        <h3><Link to={`/products/${product.id}`}>{product.name}</Link></h3>
        <p className="rating" aria-label={`Rated ${product.rating} out of 5`}>★ {product.rating}</p>
        <div className="card-foot">
          <strong className="price">{formatPrice(product.price)}</strong>
          <button type="button" className="btn btn-primary" disabled={soldOut} onClick={() => addToCart(product.id)}>
            {soldOut ? 'Sold out' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  );
}
