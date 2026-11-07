import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CATEGORIES, products } from '../data/products.js';
import { useStore } from '../context/StoreContext.jsx';
import { useStorage } from '../hooks/useStorage.js';
import ProductCard from '../components/ProductCard.jsx';
import { GridSkeleton } from '../components/Skeleton.jsx';
import EmptyState from '../components/EmptyState.jsx';

const SORTS = {
  featured: ['Featured', () => 0],
  'price-asc': ['Price: low to high', (a, b) => a.price - b.price],
  'price-desc': ['Price: high to low', (a, b) => b.price - a.price],
  rating: ['Top rated', (a, b) => b.rating - a.rating],
  name: ['Name A–Z', (a, b) => a.name.localeCompare(b.name)],
};

export default function Products() {
  const [params, setParams] = useSearchParams();
  const { wishlist } = useStore();
  const [query, setQuery] = useStorage('bl_query', '', 'session'); // search survives the session
  const [sort, setSort] = useState('featured');
  const [loading, setLoading] = useState(true);
  const cat = params.get('cat') || 'All';
  const savedOnly = params.get('saved') === '1';

  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t); }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => cat === 'All' || p.category === cat)
      .filter((p) => !savedOnly || wishlist.includes(p.id))
      .filter((p) => !q || `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q))
      .sort(SORTS[sort][1]);
  }, [query, cat, sort, savedOnly, wishlist]);

  const setCat = (c) => {
    const next = new URLSearchParams(params);
    c === 'All' ? next.delete('cat') : next.set('cat', c);
    setParams(next);
  };
  const reset = () => { setQuery(''); setSort('featured'); setParams({}); };

  return (
    <div className="container section">
      <h1>{savedOnly ? 'Your wishlist' : 'All appliances'}</h1>

      <div className="toolbar">
        <label className="field grow">
          <span>Search</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try “air fryer” or “Polar”" />
        </label>
        <label className="field">
          <span>Sort by</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {Object.entries(SORTS).map(([k, [label]]) => <option key={k} value={k}>{label}</option>)}
          </select>
        </label>
      </div>

      <div className="chips" role="group" aria-label="Filter by category">
        {['All', ...CATEGORIES].map((c) => (
          <button key={c} type="button" className={`chip ${cat === c ? 'on' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <p className="muted" aria-live="polite">{loading ? 'Loading…' : `${results.length} product${results.length === 1 ? '' : 's'}`}</p>

      {loading ? (
        <GridSkeleton />
      ) : results.length === 0 ? (
        <EmptyState
          title={savedOnly ? 'No saved items yet' : 'No products match your search'}
          text={savedOnly ? 'Tap the heart on a product to save it here.' : 'Try a different keyword or clear the filters.'}
          action={savedOnly ? <Link className="btn btn-primary" to="/products">Browse products</Link> : <button type="button" className="btn btn-primary" onClick={reset}>Clear filters</button>}
        />
      ) : (
        <div className="grid">{results.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      )}
    </div>
  );
}
