# Health E-Commerce: Backend Starter Project

> **Starter Template untuk Practice - Build dari Scratch!**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0+-brightgreen)](https://www.mongodb.com/)

**Starter project** untuk belajar step-by-step implementasi Health E-Commerce backend dengan external API integrations.

---

## Tujuan Starter Project

**Ini adalah template untuk practice!**

- Basic structure sudah ada
- TODO comments untuk guidance
- Example code snippets
- Step-by-step instructions
- **Implementasi belum lengkap** - Kamu yang akan build!

**Gunakan finished-project sebagai reference:**

- `../finished-project/` - Complete implementation
- Lihat finished untuk best practices
- Copy code jika stuck

---

## Project Structure

```
starter-project/
├── README.md                    #  Dokumentasi ini
├── package.json                 # Dependencies (sudah ada)
├── server.js                    #  TODO: Setup server
│
├── config/
│   ├── database.js             #  TODO: MongoDB connection
│   └── cloudinary.js          #  TODO: Cloudinary configuration
│
├── controllers/
│   ├── aiController.js         #  TODO: AI controller
│   └── uploadController.js     #  TODO: Image upload controller
│
├── middleware/
│   ├── auth.js                 #  TODO: JWT authentication
│   └── authorize.js           #  TODO: RBAC authorization
│
├── models/
│   ├── Product.js              #  Basic schema (expand jika perlu)
│   └── User.js                 #  Basic schema (expand jika perlu)
│
├── routes/
│   ├── externalRoutes.js       #  TODO: External API routes
│   └── uploadRoutes.js        #  TODO: Image upload routes
│
└── services/
    ├── aiService.js            #  TODO: Google Gemini integration
    ├── kemenkesService.js      #  TODO: Kemenkes API integration
    └── midtransService.js     #  TODO: Midtrans payment integration
```

**Legend:**

- = Sudah ada (basic structure)
- = Perlu diimplementasikan (TODO)

---

## Quick Start

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Setup Environment Variables

```bash
# Buat .env file
touch .env
# Windows: type nul > .env
```

**Edit `.env`:**

```env
NODE_ENV=development
PORT=3000

MONGODB_URI=mongodb://localhost:27017/health-ecommerce

JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

GOOGLE_AI_API_KEY=AIza...your-key-here

MIDTRANS_SERVER_KEY=SB-Mid-server-...
MIDTRANS_CLIENT_KEY=SB-Mid-client-...
MIDTRANS_IS_PRODUCTION=false

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Step 3: Pastikan MongoDB Running

**CATATAN PENTING:** Tidak perlu menjalankan `mongod` atau command start MongoDB jika tidak jalan di localmu. Pastikan saja MongoDB jalan dengan caramu, misalnya:

- **Membuka MongoDB Compass** dan akses database yang kamu tuju (misalnya local db mu)
- Jika MongoDB Compass sudah bisa connect ke `mongodb://localhost:27017`, berarti MongoDB sudah jalan
- Atau jika pakai MongoDB Atlas, pastikan cluster sudah active
- Intinya: **Pastikan MongoDB bisa diakses sesuai MONGODB_URI yang kamu set di .env**

**Cara cek MongoDB sudah jalan:**

```bash
# Option 1: Test dengan MongoDB Compass
# Buka MongoDB Compass → Connect ke mongodb://localhost:27017
# Jika berhasil connect = MongoDB sudah running

# Option 2: Test dengan mongosh
mongosh

# Option 3: Jika belum jalan, kamu bisa start dengan cara:
# Windows: Services → MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
# TAPI ingat: Tidak wajib! Yang penting MongoDB bisa diakses dengan caramu sendiri.
```

### Step 4: Start Server

```bash
npm run dev
```

**Server akan running di:** `http://localhost:3000`

---

## TODO Checklist

### Phase 1: Basic Setup

- [ ] **Setup Server (`server.js`)**

  - [ ] Import & configure Express
  - [ ] Setup middleware (helmet, cors, morgan)
  - [ ] Connect to MongoDB
  - [ ] Mount routes
  - [ ] Error handling

- [ ] **Database Connection (`config/database.js`)**
  - [ ] Connect to MongoDB
  - [ ] Handle connection errors
  - [ ] Log connection status

### Phase 2: Authentication

- [ ] **JWT Middleware (`middleware/auth.js`)**

  - [ ] Verify JWT token
  - [ ] Extract user from token
  - [ ] Handle invalid tokens

- [ ] **RBAC Middleware (`middleware/authorize.js`)**
  - [ ] Check user role
  - [ ] Allow/deny access

### Phase 3: External Integrations

- [ ] **AI Service (`services/aiService.js`)**

  - [ ] Setup Google Gemini client
  - [ ] Create health recommendation function
  - [ ] Parse AI response
  - [ ] Extract product recommendations

- [ ] **Kemenkes Service (`services/kemenkesService.js`)**

  - [ ] Fetch medications from Kemenkes API
  - [ ] Transform FHIR data
  - [ ] Handle errors

- [ ] **Midtrans Service (`services/midtransService.js`)**
  - [ ] Setup Midtrans client
  - [ ] Create transaction function
  - [ ] Handle webhook notifications
  - [ ] Verify signatures

### Phase 4: Routes

- [ ] **External Routes (`routes/externalRoutes.js`)**

  - [ ] POST /ai/ask - AI chatbot
  - [ ] GET /kemenkes/medications - Kemenkes data
  - [ ] POST /kemenkes/sync - Sync to DB (Admin)
  - [ ] POST /payment/create - Create payment
  - [ ] POST /payment/webhook - Handle webhook

- [ ] **AI Controller (`controllers/aiController.js`)**
  - [ ] Handle AI requests
  - [ ] Call AI service
  - [ ] Return formatted response

### Phase 5: Image Upload (Cloudinary)

- [ ] **Cloudinary Config (`config/cloudinary.js`)**

  - [ ] Install cloudinary package
  - [ ] Configure with environment variables
  - [ ] Validate configuration
  - [ ] Export cloudinary instance

- [ ] **Upload Routes (`routes/uploadRoutes.js`)**

  - [ ] Setup multer with CloudinaryStorage
  - [ ] Create product image storage (800x800px)
  - [ ] Create profile photo storage (400x400px)
  - [ ] POST /product - Upload product image (Admin only)
  - [ ] POST /profile - Upload profile photo (Protected)
  - [ ] DELETE /:publicId - Delete image (Protected)

- [ ] **Upload Controller (`controllers/uploadController.js`)**
  - [ ] Implement uploadProductImage
  - [ ] Implement uploadProfilePhoto (update user model)
  - [ ] Implement deleteImage
  - [ ] Error handling

---

## Learning Path

### Step 1: Read the Code

1. Baca semua file di starter project
2. Pahami struktur dan TODO comments
3. Lihat finished-project untuk reference

### Step 2: Implement Basic Setup

1. Setup `server.js` dengan Express
2. Connect MongoDB di `config/database.js`
3. Test health endpoint

### Step 3: Implement Authentication

1. Setup JWT middleware
2. Test protected routes
3. Implement RBAC

### Step 4: Implement External APIs

1. Setup Google Gemini AI
2. Test AI chatbot endpoint
3. Setup Midtrans payment
4. Test payment creation

### Step 5: Implement Image Upload

1. **Setup Cloudinary:**

   - Install: `npm install cloudinary multer multer-storage-cloudinary`
   - Get free account: https://cloudinary.com/
   - Add credentials to `.env`:
     ```
     CLOUDINARY_CLOUD_NAME=your-cloud-name
     CLOUDINARY_API_KEY=your-api-key
     CLOUDINARY_API_SECRET=your-api-secret
     ```
   - Configure `config/cloudinary.js`

2. **Implement Upload Routes:**

   - Setup multer with CloudinaryStorage
   - Create routes for product and profile upload
   - Add authentication middleware

3. **Implement Upload Controller:**

   - Handle file uploads
   - Update user profile photo
   - Delete images from Cloudinary

4. **Test Upload Endpoints:**
   - Test product image upload (Admin)
   - Test profile photo upload (User)
   - Test image deletion

### Step 6: Test Everything

1. Test semua endpoints
2. Fix bugs
3. Compare dengan finished-project

---

## Tips & Tricks

### 1. Use Finished Project as Reference

```bash
# Lihat finished implementation
cd ../finished-project
# Baca code, pahami pattern
# Copy jika perlu (tapi pahami dulu!)
```

### 2. Read Documentation

- Google Gemini: https://ai.google.dev/docs
- Midtrans: https://docs.midtrans.com/
- Express: https://expressjs.com/

### 3. Test Incrementally

```bash
# Test setiap step
# Jangan langsung implement semua
# Test → Fix → Continue
```

### 4. Use Console Logs

```javascript
console.log("Debug:", data);
// Helpful untuk debugging
```

### 5. Check Error Messages

- Read error messages carefully
- Google error messages
- Check Stack Overflow

---

## Common Issues

### "Cannot find module"

**Solution:**

```bash
npm install
```

### "MongoDB connection failed"

**Solution:**

**CATATAN PENTING:** Tidak perlu menjalankan `mongod` jika tidak jalan di localmu. Pastikan saja MongoDB jalan dengan caramu, misalnya:

- **Membuka MongoDB Compass** dan akses database yang kamu tuju (misalnya local db mu)
- Jika MongoDB Compass sudah bisa connect ke `mongodb://localhost:27017`, berarti MongoDB sudah jalan
- Atau jika pakai MongoDB Atlas, pastikan cluster sudah active
- Intinya: **Pastikan MongoDB bisa diakses sesuai MONGODB_URI yang kamu set di .env**

**Cara cek MongoDB sudah jalan:**

```bash
# Option 1: Test dengan MongoDB Compass
# Buka MongoDB Compass → Connect ke mongodb://localhost:27017
# Jika berhasil connect = MongoDB sudah running

# Option 2: Test dengan mongosh
mongosh

# Option 3: Jika belum jalan, kamu bisa start dengan cara:
# Windows: Services → MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
# TAPI ingat: Tidak wajib! Yang penting MongoDB bisa diakses dengan caramu sendiri.
```

### "JWT_SECRET not set"

**Solution:**

```bash
# Add to .env
JWT_SECRET=your-secret-key
```

### "API key invalid"

**Solution:**

- Check API key di `.env`
- Verify key is correct
- Check API key permissions

---

## Resources

### Documentation

- **Finished Project:** `../finished-project/README.md`
- **Express Docs:** https://expressjs.com/
- **MongoDB Docs:** https://docs.mongodb.com/
- **JWT Docs:** https://jwt.io/

### API Documentation

- **Google Gemini:** https://ai.google.dev/docs
- **Midtrans:** https://docs.midtrans.com/
- **Kemenkes:** https://satusehat.kemkes.go.id/platform/docs/

### Tools

- **Postman** - API testing
- **MongoDB Compass** - Database GUI
- **ngrok** - Webhook testing

---

## Completion Checklist

Setelah selesai, pastikan:

- [ ] Server running tanpa error
- [ ] MongoDB connected
- [ ] Health endpoint works
- [ ] AI chatbot endpoint works
- [ ] Payment creation works
- [ ] Webhook handler works
- [ ] All routes protected properly
- [ ] Error handling implemented
- [ ] Logging implemented

---

## Next Steps

Setelah starter project selesai:

1. **Compare dengan finished-project**

   - Lihat perbedaan
   - Pahami best practices
   - Improve code quality

2. **Add More Features**

   - Shopping cart API
   - Order management
   - Image upload
   - Email service

3. **Deploy to Production**
   - Railway
   - Heroku
   - Vercel

---

**Happy Coding! **

**Remember:** Practice makes perfect! Don't give up!

---

** Repository Info:**

- **Name:** `komdigi-fsd-intermediate-modul-5-backend-health-ecommerce-external-integration/starter-project`
- **Type:** Starter Template (untuk practice)
- **Finished Version:** `komdigi-fsd-intermediate-modul-5-backend-health-ecommerce-external-integration/finished-project`

_Modul 5 - External API Integration (Starter)_  
_Health E-Commerce Backend Series_
