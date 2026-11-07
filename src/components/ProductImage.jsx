import { PLACEHOLDER, imageSrc } from '../utils/format.js';

// Lazy-loaded product photo; falls back to the placeholder if the file is missing.
export default function ProductImage({ product, eager = false }) {
  return (
    <img
      src={imageSrc(product.image)}
      alt={`${product.name} by ${product.brand}`}
      width="400"
      height="400"
      loading={eager ? 'eager' : 'lazy'}
      onError={(e) => {
        if (!e.currentTarget.src.endsWith('placeholder.svg')) e.currentTarget.src = PLACEHOLDER;
      }}
    />
  );
}
