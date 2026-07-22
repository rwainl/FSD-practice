# Health E-Commerce - Starter Project (Modul 1)

Starter template untuk belajar React fundamentals dengan TailwindCSS.

## Penting - Backend

Sebelum menjalankan frontend, pastikan Backend (Modul 5) berjalan di `http://localhost:5000`.

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
   - Jika backend running di port lain, update URL di `src/services/api.js` atau `src/App.jsx`

## Run Frontend (starter-project)

```bash
cd starter-project
npm install
npm run dev
# Buka http://localhost:5173
```
