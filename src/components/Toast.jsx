import { useStore } from '../context/StoreContext.jsx';

export default function Toast() {
  const { toast } = useStore();
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
