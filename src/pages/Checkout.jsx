import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice } from '../utils/format.js';
import { validateAll, validateField } from '../utils/validators.js';
import EmptyState from '../components/EmptyState.jsx';

const FIELDS = [
  ['name', 'Full name', 'text', 'name'],
  ['email', 'Email', 'email', 'email'],
  ['phone', 'Mobile number', 'tel', 'tel'],
  ['address', 'Street address', 'text', 'street-address'],
  ['city', 'City', 'text', 'address-level2'],
  ['postal', 'Postal code', 'text', 'postal-code'],
  ['card', 'Card number', 'text', 'cc-number'],
  ['expiry', 'Expiry (MM/YY)', 'text', 'cc-exp'],
  ['cvv', 'CVV', 'password', 'cc-csc'],
];

export default function Checkout() {
  const { totals, clearCart } = useStore();
  const [values, setValues] = useState({});
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  if (order) {
    return (
      <div className="container section narrow">
        <div className="confirm" role="status">
          <h1>Order confirmed</h1>
          <p>Thanks, {order.name}! Your order <strong>{order.id}</strong> for {formatPrice(order.total)} is being prepared. A receipt was sent to {order.email}.</p>
          <p className="muted">This is a demo: no payment was taken.</p>
          <Link to="/products" className="btn btn-primary">Continue shopping</Link>
        </div>
      </div>
    );
  }

  if (totals.lines.length === 0) {
    return <div className="container section"><EmptyState title="Nothing to check out" text="Your cart is empty." action={<Link className="btn btn-primary" to="/products">Browse products</Link>} /></div>;
  }

  const onChange = (f, v) => {
    setValues((s) => ({ ...s, [f]: v }));
    if (touched[f]) setErrors((e) => ({ ...e, [f]: validateField(f, v) }));
  };
  const onBlur = (f) => {
    setTouched((t) => ({ ...t, [f]: true }));
    setErrors((e) => ({ ...e, [f]: validateField(f, values[f] || '') }));
  };

  const submit = (e) => {
    e.preventDefault();
    const all = validateAll(values);
    setErrors(all);
    setTouched(Object.fromEntries(FIELDS.map(([f]) => [f, true])));
    if (Object.values(all).some(Boolean)) {
      document.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    setOrder({ id: `BL-${Date.now().toString().slice(-6)}`, name: values.name.trim(), email: values.email.trim(), total: totals.total });
    clearCart();
  };

  return (
    <div className="container section">
      <h1>Checkout</h1>
      <div className="checkout">
        <form onSubmit={submit} noValidate>
          <div className="form-grid">
            {FIELDS.map(([f, label, type, ac]) => {
              const bad = touched[f] && errors[f];
              const good = touched[f] && !errors[f];
              return (
                <div key={f} className={`field ${f === 'address' ? 'full' : ''}`}>
                  <label htmlFor={f}>{label}</label>
                  <input id={f} name={f} type={type} autoComplete={ac} value={values[f] || ''}
                    className={bad ? 'invalid' : good ? 'valid' : ''}
                    aria-invalid={bad ? 'true' : 'false'} aria-describedby={`${f}-err`}
                    onChange={(e) => onChange(f, e.target.value)} onBlur={() => onBlur(f)} />
                  <small id={`${f}-err`} className="error">{bad ? errors[f] : ''}</small>
                </div>
              );
            })}
          </div>
          <button type="submit" className="btn btn-primary btn-lg">Place order · {formatPrice(totals.total)}</button>
        </form>

        <aside className="summary" aria-label="Order summary">
          <h2>Order summary</h2>
          <ul>
            {totals.lines.map(({ id, qty, product }) => (
              <li key={id}><span>{qty} × {product.name}</span><span>{formatPrice(qty * product.price)}</span></li>
            ))}
          </ul>
          <dl className="totals">
            <div><dt>Subtotal</dt><dd>{formatPrice(totals.subtotal)}</dd></div>
            <div><dt>Shipping</dt><dd>{totals.shipping ? formatPrice(totals.shipping) : 'Free'}</dd></div>
            <div className="grand"><dt>Total</dt><dd>{formatPrice(totals.total)}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
