const money = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 });
export const formatPrice = (n) => money.format(n);
export const imageSrc = (file) => `${import.meta.env.BASE_URL}images/${file}`;
export const PLACEHOLDER = `${import.meta.env.BASE_URL}images/placeholder.svg`;
export const SHIPPING_FREE_OVER = 20000;
export const SHIPPING_FEE = 500;
