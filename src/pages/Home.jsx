import { Link } from 'react-router-dom';
import { CATEGORIES, products } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';

const perks = [
  ['Free delivery', 'On orders over ₱20,000.'],
  ['12-month warranty', 'On every appliance we sell.'],
  ['Easy returns', 'Return unused items within 7 days.'],
];

export default function Home() {
  const featured = products.filter((p) => p.badge).slice(0, 4);
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>Appliances that make the daily routine easier.</h1>
            <p className="lead">Cook, wash, cool and clean with reliable products at honest prices.</p>
            <Link to="/products" className="btn btn-primary btn-lg">Shop all appliances</Link>
          </div>
          <ul className="hero-panel" aria-label="Shop by category">
            {CATEGORIES.map((c) => (
              <li key={c}><Link to={`/products?cat=${c}`}>{c}<span aria-hidden="true">›</span></Link></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container section" aria-labelledby="feat">
        <div className="section-head">
          <h2 id="feat">Featured picks</h2>
          <Link to="/products">View all</Link>
        </div>
        <div className="grid">{featured.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      <section className="perks" aria-label="Store benefits">
        <div className="container perks-grid">
          {perks.map(([t, d]) => (
            <article key={t}><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
      </section>
    </>
  );
}
