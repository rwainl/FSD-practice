# Health E-Commerce Dashboard - Starter Project

> **Frontend Modul 2: React Advanced dengan Router, Query & Ant Design**

[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6.21-red)](https://reactrouter.com/)
[![React Query](https://img.shields.io/badge/TanStack_Query-5.17-purple)](https://tanstack.com/query/)
[![Ant Design](https://img.shields.io/badge/Ant_Design-5.12-cyan)](https://ant.design/)

**Project untuk practice React advanced patterns!** (Dengan TODO yang jelas)

---

## Apa Isi Project Ini?

Project ini adalah **starter template** untuk belajar:

- **React Router v6** - Multi-page navigation
- **TanStack Query v5** - Smart data caching
- **Ant Design v5** - Professional UI components
- **Context API** - Global state management

**Status:** **Incomplete** - Ada banyak TODO yang harus kamu selesaikan!

---

## Learning Objectives

Dengan menyelesaikan TODO di project ini, kamu akan belajar:

1. **Setup React Router** untuk multi-page navigation
2. **Configure React Query** untuk smart data fetching & caching
3. **Use Ant Design** components untuk professional UI
4. **Create Context** untuk global state (shopping cart)
5. **Integrate dengan Backend API** (localhost:5000)

---

## Quick Start (Untuk Newbie)

### Prerequisites

**Wajib Running:** backend API di `http://localhost:5000`.

PENTING - Backend (Modul 5):

Jangan lupa running project final backend dari Modul 5 di backend modul program intermediate ini. Backend yang harus digunakan adalah `komdigi-fsd-intermediate-modul-5-backend-health-ecommerce-external-integration` dari folder `backend/health-ecommerce-external-integration/finished-project`.

Langkah-langkah setup backend:

1. Masuk ke folder backend Modul 5:
```bash
cd backend/health-ecommerce-external-integration/finished-project
```

2. Install dependencies:
```bash
npm install
```

3. Setup file `.env`:
   - Buat file `.env` di folder `finished-project` (copy dari `.env.example` jika ada)
   - Set minimal environment variables berikut:
     ```env
     NODE_ENV=development
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/health-ecommerce
     JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-characters
     JWT_EXPIRES_IN=24h
     ```
   - Untuk fitur tambahan (optional), bisa set:
     - `GOOGLE_AI_API_KEY` (untuk AI chatbot)
     - `CLOUDINARY_*` (untuk image upload)
     - `MIDTRANS_*` (untuk payment)
     - `SMTP_*` (untuk email service)
     - `KEMENKES_API_KEY` (untuk Kemenkes integration)

4. Pastikan MongoDB running:
   - Tidak perlu menjalankan `mongod` jika tidak jalan di localmu
   - Pastikan saja MongoDB jalan dengan caramu, misalnya:
     - Membuka MongoDB Compass dan akses database yang kamu tuju (misalnya local db mu)
     - Jika MongoDB Compass sudah bisa connect ke `mongodb://localhost:27017`, berarti MongoDB sudah jalan
     - Atau jika pakai MongoDB Atlas, pastikan cluster sudah active
     - Intinya: Pastikan MongoDB bisa diakses sesuai MONGODB_URI yang kamu set di .env

5. Seed data (optional, jika ada):
```bash
npm run seed
```

6. Start backend (keep running di terminal terpisah):
```bash
npm run dev
```

7. Verifikasi backend running:
   - Backend akan tersedia di `http://localhost:5000`
   - Test dengan: `curl http://localhost:5000/health` atau buka di browser
   - Pastikan response success

8. Set environment variable di frontend:
   - Di file `.env` di frontend project (jika ada), atau langsung di code, pastikan URL backend sama dengan yang dirun
   - Default: `http://localhost:5000/api`
   - Jika backend running di port lain, update URL di `src/services/api.js` (ubah `BASE_URL`)

**Software Required:**

- Node.js v20+ (LTS)
- npm v10+

---

### Setup Instructions

```bash
# 1. Jika belum, clone repository modul ini
git clone https://github.com/your-username/komdigi-fsd-intermediate-modul-2-frontend-health-ecommerce-react-dashboard.git
cd komdigi-fsd-intermediate-modul-2-frontend-health-ecommerce-react-dashboard

# 2. Masuk ke starter-project
cd starter-project

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

# 5. Open browser (http://localhost:3000)
```

**Note:** Port 3000 (berbeda dengan Modul 1 yang pakai 5173)

---

## TODO List (Yang Harus Kamu Kerjakan)

### 1. Setup Providers (`src/main.jsx`)

- [ ] Wrap App dengan BrowserRouter
- [ ] Wrap App dengan QueryClientProvider
- [ ] Add ReactQueryDevtools

### 2. Setup Routes (`src/App.jsx`)

- [ ] Import semua pages
- [ ] Configure React Router Routes
- [ ] Add Navbar component

### 3. Create CartContext (`src/context/CartContext.jsx`)

- [ ] Implement addToCart function
- [ ] Implement removeFromCart function
- [ ] Implement updateQuantity function
- [ ] Calculate cartTotal & cartCount

### 4. Build Components

- [ ] **Navbar**: Navigation links dengan cart badge
- [ ] **ProductCard**: Display product dengan add to cart button

### 5. Complete Pages

- [ ] **HomePage**: Hero section + features
- [ ] **ProductsPage**: Fetch & display products dengan React Query
- [ ] **ProductDetailPage**: Dynamic route, product details
- [ ] **CartPage**: Display cart items, remove/update
- [ ] **LoginPage**: Auth form dengan Ant Design

### 6. API Integration (`src/services/api.js`)

- [ ] Create getProducts function
- [ ] Create getProductById function
- [ ] Create login function

---

## Project Structure

```
starter-project/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           #  TODO: Navigation dengan cart badge
│   │   └── ProductCard.jsx       #  TODO: Product display
│   ├── pages/
│   │   ├── HomePage.jsx          #  TODO: Landing page
│   │   ├── ProductsPage.jsx      #  TODO: Product catalog dengan React Query
│   │   ├── ProductDetailPage.jsx #  TODO: Product detail
│   │   ├── CartPage.jsx          #  TODO: Shopping cart
│   │   └── LoginPage.jsx         #  TODO: Login form
│   ├── context/
│   │   └── CartContext.jsx       #  TODO: Global cart state
│   ├── services/
│   │   └── api.js                #  TODO: API functions
│   ├── App.jsx                   #  TODO: Router setup
│   ├── main.jsx                  #  TODO: Provider setup
│   └── index.css                 #  Ready
├── index.html                     #  Ready
├── vite.config.js                 #  Ready
├── tailwind.config.js             #  Ready
└── package.json                   #  Ready
```

---

## How to Test

### 1. Check Backend Running

```bash
# Di terminal terpisah, cek backend running
curl http://localhost:5000/api/products

# Should return JSON dengan products
```

### 2. Test React Query DevTools

- Start frontend: `npm run dev`
- Open browser: http://localhost:3000
- Lihat bottom-left corner → React Query icon
- Klik untuk open DevTools
- Navigate to /products
- See query status: fetching → success → cached!

### 3. Test Routing

- Navigate ke /products → URL changes, no reload!
- Click product → Navigate ke /products/:id
- Check browser back button → Works!

### 4. Test Cart

- Add product → Cart badge updates
- Navigate to different page → Badge persists
- Go to /cart → Items listed

---

## Common Issues & Fixes

### "Backend not running" / "Network Error"

**Problem:** Frontend tidak bisa connect ke backend

**Fix:**

```bash
# 1. Check backend running
curl http://localhost:5000/api/products

# 2. If not running, start backend
cd ../../../Backend/Modul_5-External_API_Integration/finished-project
npm run dev

# 3. Verify backend at http://localhost:5000
```

---

### "useQuery is not defined"

**Problem:** React Query not properly imported

**Fix:**

```jsx
// src/pages/ProductsPage.jsx
import { useQuery } from "@tanstack/react-query";
```

---

### "useCart must be used within CartProvider"

**Problem:** CartProvider not wrapping App

**Fix:**

```jsx
// src/main.jsx
import { CartProvider } from "./context/CartContext";

<CartProvider>
  <App />
</CartProvider>;
```

---

### "Ant Design styles not loading"

**Problem:** Ant Design CSS not imported

**Fix:**

```jsx
// src/main.jsx
import "antd/dist/reset.css"; // Add this line
```

---

### Port 3000 already in use

**Problem:** Another app using port 3000

**Fix:**

```js
// vite.config.js - Change port
export default defineConfig({
  server: {
    port: 3001, // Or any free port
  },
});
```

---

## Learning Tips

**1. Start Small**

- Complete 1 TODO at a time
- Test immediately after each change
- Don't move to next until current works

**2. Use React Query DevTools**

- See queries in action
- Understand caching behavior
- Debug data fetching

**3. Explore Ant Design**

- Check [Ant Design docs](https://ant.design/)
- 50+ components available
- Copy examples & customize

**4. Compare with Finished Project**

- Stuck? Check finished-project untuk reference
- Don't copy-paste! Understand first, then implement

**5. Debug Systematically**

- Read error messages carefully
- Check browser console
- Use React DevTools
- Check network tab

---

## Success Criteria

Kamu berhasil jika:

- [x] All routes working (5 pages navigable)
- [x] React Query caching products (no duplicate fetches)
- [x] Cart context working (add, remove, persist across pages)
- [x] Ant Design UI rendering correctly
- [x] Backend integration working (fetch products, login)

---

## Resources

**Documentation:**

- [React Router v6](https://reactrouter.com/en/main)
- [TanStack Query v5](https://tanstack.com/query/latest)
- [Ant Design v5](https://ant.design/components/overview)
- [Vite](https://vitejs.dev/)

**Tutorials:**

- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [React Query Quick Start](https://tanstack.com/query/latest/docs/react/quick-start)
- [Ant Design Getting Started](https://ant.design/docs/react/introduce)

---

## Challenge #1: Add Product Filters

Implement filtering products by category & price range!

**Hints:**

- Add state untuk selectedCategory, minPrice, maxPrice
- Use Ant Design Select & Input components
- Filter products array sebelum display
- OR pass sebagai query params ke API

---

## Challenge #2: Add Product Search

Implement search functionality!

**Hints:**

- Add Input.Search from Ant Design
- Filter products by name/description
- Update queryKey untuk refetch when search changes
- Use debounce untuk better performance

---

## Challenge #3: Persist Cart to localStorage

Make cart persist after page reload!

**Hints:**

```jsx
// Load from localStorage on mount
useEffect(() => {
  const saved = localStorage.getItem("cart");
  if (saved) setCart(JSON.parse(saved));
}, []);

// Save to localStorage when cart changes
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);
```

---

## Next Steps

After completing all TODOs:

1.  **Test thoroughly** - All features working
2.  **Compare with finished-project** - See differences
3.  **Try challenges** - Extend functionality
4.  **Deploy** - Share your work (Vercel/Netlify)
5.  **Frontend Modul 3** - UI/UX Best Practices

---

## Perbedaan dengan Modul 1

| Aspect               | Modul 1 (Fundamentals) | Modul 2 (Advanced)          |
| -------------------- | ---------------------- | --------------------------- |
| **Pages**            | Single page            | Multi-page (5 pages)        |
| **Routing**          | No routing             | React Router v6             |
| **Data Fetching**    | useEffect + axios      | React Query (smart caching) |
| **UI Library**       | Custom + Tailwind      | Ant Design + Tailwind       |
| **State Management** | Local useState         | Context API (global)        |
| **Complexity**       | Beginner               | Production-ready            |

**Modul 1:** Learn React basics  
**Modul 2:** Build production patterns!

---

**Happy Coding!**

_Practice makes perfect - complete all TODOs!_

---

** Repository Info:**

- **Name:** `komdigi-fsd-intermediate-modul-2-frontend-health-ecommerce-react-dashboard`
- **Type:** React Advanced (Starter Template)
- **Backend:** Requires `localhost:5000` (Backend Modul 5: `komdigi-fsd-intermediate-modul-5-backend-health-ecommerce-external-integration`)
- **Level:** Intermediate
