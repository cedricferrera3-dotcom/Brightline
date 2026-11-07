# Brightline Appliances

A client-side e-commerce storefront for home appliances, built with React + Vite. No backend: all data
lives in `src/data/products.js`, and cart/wishlist/session state is stored in the browser.

## Setup
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```
Add your product photos to `public/images/` (see `public/images/README.md` for file names). Missing photos
fall back to a placeholder.

## Pages
| Route | View |
|---|---|
| `/#/` | Landing page: hero, category links, featured picks, store benefits |
| `/#/products` | PLP: search, category filter, sort, skeleton loading, empty state |
| `/#/products/:id` | PDP: gallery image, features, quantity, wishlist, related + recently viewed |
| `/#/checkout` | Validated checkout form and simulated confirmation |

## Architecture
```
design/            exported Figma frames + tokens board
public/images/     product photos (drop yours here)
src/
  components/      Header, Footer, ProductCard, CartDrawer, QuantityStepper, Skeleton, EmptyState, Toast
  pages/           Home, Products, ProductDetail, Checkout (lazy-loaded routes)
  context/         StoreContext: cart, wishlist, recently viewed, totals, toast
  hooks/           useStorage: useState synced to localStorage/sessionStorage
  utils/           format.js (currency, image paths), validators.js (regex rules)
  data/            products.js (catalog)
  styles/          tokens.css (Figma tokens) -> base.css -> components.css
```

## Design decisions
- **Tokens:** `tokens.css` variables match Figma color and type styles (primary, secondary, neutrals 100-900, danger/success; display, headings, body, caption).
- **UX laws:** every button, chip and stepper is at least 44x44px (Fitts); products are grouped into four categories and filters are shown as chips (Hick); details such as the cart live in a drawer (progressive disclosure).
- **Semantic HTML:** header, nav, main, section, article, aside, footer; one `h1` per page; every input has a `label`; every image has descriptive `alt`.
- **Layout:** CSS Grid for product galleries, Flexbox for nav, cards and toolbars; mobile-first `min-width` queries; `rem` units.
- **Storage:** cart and wishlist in `localStorage`; recently viewed items and the search query in `sessionStorage`.
- **Performance:** route-level `React.lazy`, `loading="lazy"` images, skeleton cards, empty states, toast and button micro-interactions (`prefers-reduced-motion` respected).

## Feature guide
1. Add to cart from any card or the PDP; adjust quantity or remove in the cart drawer; totals update instantly.
2. Tap the heart to save items; open the wishlist from the header.
3. On the PLP, type to filter in real time, pick a category chip, and change the sort order.
4. Checkout validates on blur and while typing. Test card: `4242 4242 4242 4242`, `12/30`, `123`.

## Suggested commit history
`chore: scaffold vite react app` -> `feat: design tokens and base styles` -> `feat: product data and card` -> `feat: landing page` -> `feat: PLP search filter sort` -> `feat: PDP` -> `feat: cart context + localStorage` -> `feat: cart drawer` -> `feat: checkout validation` -> `feat: skeletons and empty states` -> `docs: README and Figma exports`
