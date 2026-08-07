# Health E-Commerce: Backend Project (Completed)

Project backend Health E-Commerce berbasis Node.js dan Express yang terintegrasi dengan berbagai external API (Google Gemini, Midtrans, dan Cloudinary) serta database MongoDB.

### Technical Stack

- Runtime: Node.js (v18+)

- Framework: Express.js

- Database: MongoDB & Mongoose

- Authentication & Authorization: JWT & Role-Based Access Control (RBAC)

- Integrations:
* Google Gemini AI: Fitur AI chatbot & rekomendasi produk kesehatan
* Midtrans: Payment gateway (Snap API & Webhook notification)
* Cloudinary & Multer: Media upload & image transformation (produk & profil)
* Kemenkes (SatuSehat): Integrasi FHIR data obat-obatan

### Project Architecture

```
├── config/
│   ├── database.js          # MongoDB connection handler
│   └── cloudinary.js        # Cloudinary SDK setup
├── controllers/
│   ├── aiController.js      # Controller untuk Gemini AI
│   └── uploadController.js  # Controller untuk penanganan file upload
├── middleware/
│   ├── auth.js              # Verification JWT token
│   └── authorize.js         # Check user role / RBAC
├── models/
│   ├── Product.js           # Mongoose Product Schema
│   └── User.js              # Mongoose User Schema
├── routes/
│   ├── externalRoutes.js    # Routes AI, Kemenkes API, & Midtrans
│   └── uploadRoutes.js      # Routes upload gambar (Product & Profile)
├── services/
│   ├── aiService.js         # Integration layer Google Gemini
│   ├── kemenkesService.js   # Integration layer Kemenkes FHIR API
│   └── midtransService.js   # Integration layer Midtrans Snap & Webhook
└── server.js                # Express app initialization & server entry point
```

### Feature Implementation Status

Fitur dasar dan integrasi pihak ketiga telah selesai diimplementasikan:

- [x] Core & Database: Inisialisasi Express server, error handling global, dan koneksi MongoDB.

- [x] Auth & Security: Middleware autentikasi JWT dan otorisasi RBAC (Admin/User).

- [x] AI Chatbot Service: Integrasi Google Gemini API untuk konseling kesehatan dan pencarian produk otomatis.

- [x] Payment Processing: pembuatan transaksi via Midtrans Snap API beserta verifikasi webhook notification.

- [x] Media Management: Engine upload foto produk (auto-crop 800x800) dan foto profil (400x400) ke Cloudinary.

- [ ] Kemenkes Data Fetching: Service pengambil data obat FHIR/Kemenkes.