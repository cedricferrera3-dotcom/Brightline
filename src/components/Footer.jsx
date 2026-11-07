import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <section>
          <h2>Brightline</h2>
          <p>Appliances for the kitchen, laundry and living room.</p>
        </section>
        <nav aria-label="Footer">
          <h2>Shop</h2>
          <Link to="/products?cat=Kitchen">Kitchen</Link>
          <Link to="/products?cat=Laundry">Laundry</Link>
          <Link to="/products?cat=Cooling">Cooling</Link>
          <Link to="/products?cat=Cleaning">Cleaning</Link>
        </nav>
        <section>
          <h2>Help</h2>
          <p>Free delivery on orders over ₱20,000. Demo store: no real payments.</p>
        </section>
      </div>
    </footer>
  );
}
