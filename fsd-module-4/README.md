# Starter Project - Secure Health API

## Deskripsi

Starter project untuk latihan Authentication & Security dalam konteks **Health E-Commerce API**.

**Catatan Penting:** Project ini **melanjutkan dari Modul 3** (Express API) dengan menambahkan:

- JWT authentication untuk user login
- Password hashing untuk secure storage
- RBAC untuk protect admin routes
- Security middleware (Helmet, rate limiting)

Structure server sudah ada dari Modul 3, sekarang kamu tambahkan auth layer!

Lengkapi implementasi JWT auth, password hashing, RBAC, dan security best practices.

## Tugas

### 1. Lengkapi `models/User.js`

Buat User schema dengan:

- Fields: name, email (unique), password (select: false), role (enum: user/admin)
- Pre-save hook untuk hash password dengan bcrypt
- Instance method `comparePassword(candidatePassword)`
- Timestamps

### 2. Lengkapi `middleware/auth.js`

Implement JWT middleware:

- `authenticateToken(req, res, next)` - Verify JWT dari Authorization header
- Extract token dari "Bearer TOKEN" format
- Verify dengan jwt.verify()
- Attach decoded user ke req.user
- Handle expired dan invalid tokens

### 3. Lengkapi `middleware/authorize.js`

Implement RBAC:

- `authorizeRole(...allowedRoles)` - Check user role
- Return 403 kalau role not allowed
- Support multiple roles

### 4. Lengkapi `middleware/validate.js`

Input validation rules:

- `registerValidation` - email, password (min 8, strength check), name
- `loginValidation` - email, password
- Use express-validator

### 5. Lengkapi `controllers/authController.js`

Auth functions:

- `register(req, res)` - Create user, return token
- `login(req, res)` - Verify credentials, return token
- `getProfile(req, res)` - Get current user info
- `updatePassword(req, res)` - Change password

### 6. Lengkapi `routes/authRoutes.js`

Routes:

- POST `/register` - dengan validation
- POST `/login` - dengan rate limiting
- GET `/profile` - protected (require auth)
- PUT `/password` - protected

### 7. Lengkapi `server.js`

Setup secure server:

- Helmet untuk security headers
- CORS dengan whitelist
- Rate limiting
- Error handler yang nggak expose details

## API Documentation

Setelah implement semua TODOs, test API dengan tools berikut:

### 1. Swagger UI (Interactive Docs)

**Setup:**

- File `swagger.yaml` sudah ada di parent folder
- Implement swagger-ui-express di `server.js` (lihat finished-project)

**Cara pakai:**

1. Start server: `npm run dev`
2. Buka: `http://localhost:3000/api-docs`
3. Test endpoints langsung dari browser

**Untuk protected endpoints:**

- Click "Authorize" button
- Format: `Bearer YOUR_TOKEN` (spasi setelah Bearer!)
- Token didapat dari register/login response

### 2. Postman Collection

**Import:**

- File: `../Secure-Health-API-Auth.postman_collection.json`
- Postman → Import → pilih file

**Setup:**

- Set variable `baseUrl` = `http://localhost:3000`
- Token auto-saved ke `{{authToken}}` setelah login

**Test scenarios:**

1. Register User → token auto-saved
2. Login → update token
3. Get Profile → authenticated otomatis
4. Update Password → authenticated
5. Unauthorized access → test tanpa token
6. Invalid credentials → test error handling
7. Validation errors → test missing fields

---

## Testing Checklist

Setelah implement, test dengan Postman:

1. **Authentication Flow:**

   - [ ] Register new user
   - [ ] Login dan copy token
   - [ ] Access protected routes dengan token
   - [ ] Try invalid tokens

2. **Authorization (RBAC):**

   - [ ] Test different roles (user vs admin)
   - [ ] Admin-only endpoints
   - [ ] User cannot access admin routes

3. **Security Features:**

   - [ ] Test rate limiting (login 6x cepat)
   - [ ] Invalid input validation
   - [ ] XSS/injection attempts

4. **Error Handling:**
   - [ ] Missing required fields
   - [ ] Invalid email format
   - [ ] Weak passwords
   - [ ] Duplicate emails

**Selamat mengerjakan! **
