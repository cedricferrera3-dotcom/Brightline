export function CardSkeleton() {
  return (
    <div className="card skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-img" />
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-line short" />
    </div>
  );
}

export function GridSkeleton({ count = 8 }) {
  return (
    <div className="grid" role="status" aria-label="Loading products">
      {Array.from({ length: count }, (_, i) => <CardSkeleton key={i} />)}
    </div>
  );
}
