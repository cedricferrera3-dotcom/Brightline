// Regex rules for checkout. Each returns an error message or '' when valid.
const rules = {
  name: [/^[A-Za-z][A-Za-z .'-]{1,59}$/, 'Enter your full name (letters only).'],
  email: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Enter a valid email, like name@example.com.'],
  phone: [/^(09|\+639)\d{9}$/, 'Use a PH mobile number, like 09171234567.'],
  address: [/^.{8,}$/, 'Enter your street address (at least 8 characters).'],
  city: [/^[A-Za-z][A-Za-z .'-]{1,39}$/, 'Enter your city or municipality.'],
  postal: [/^\d{4}$/, 'Postal code must be 4 digits.'],
  card: [/^\d{4} ?\d{4} ?\d{4} ?\d{4}$/, 'Card number must be 16 digits.'],
  expiry: [/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use MM/YY.'],
  cvv: [/^\d{3,4}$/, 'CVV is 3 or 4 digits.'],
};

export const validateField = (field, value) => {
  const [re, msg] = rules[field];
  return re.test(value.trim()) ? '' : msg;
};

export const validateAll = (values) =>
  Object.fromEntries(Object.keys(rules).map((f) => [f, validateField(f, values[f] || '')]));
