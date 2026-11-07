import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

export default function Header() {
  const { totals, wishlist, setCartOpen } = useStore();
  return (
    <header className="site-header">
      <div className="container header-row">
        <Link to="/" className="logo">Brightline</Link>
        <nav aria-label="Main">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Shop all</NavLink>
        </nav>
        <div className="header-actions">
          <Link to="/products?saved=1" className="icon-btn" aria-label={`Wishlist, ${wishlist.length} saved`}>
            ♥ <span className="count">{wishlist.length}</span>
          </Link>
          <button type="button" className="btn btn-primary" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${totals.count} items`}>
            Cart <span className="count">{totals.count}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
