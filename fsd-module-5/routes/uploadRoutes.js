/**
 * Upload Routes
 * 
 * TODO untuk peserta:
 * 1. Import express router
 * 2. Import multer dan CloudinaryStorage
 * 3. Import cloudinary config
 * 4. Import uploadController
 * 5. Import middleware (authenticateToken, authorizeRole)
 * 6. Setup multer storage untuk product images dan profile photos
 * 7. Create routes:
 *    - POST /product - Upload product image (Admin only)
 *    - POST /profile - Upload profile photo (Protected)
 *    - DELETE /:publicId - Delete image (Protected)
 * 
 * Reference: ../finished-project/routes/uploadRoutes.js
 */

const express = require('express');
const router = express.Router();

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const uploadController = require('../controllers/uploadController');
const { authenticateToken } = require('../middleware/auth');
const { authorizeRole } = require('../middleware/authorize');


const productStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'health-ecommerce/products',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 800, height: 800, crop: "limit", quality: "auto" }],
    },
});

const profileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'health-ecommerce/profiles',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 800, height: 800, crop: "limit", quality: "auto" }],
    }
});

const uploadProduct = multer({
    storage: productStorage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, res, cb) => {
        if(!ifle.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed'), false);
        }
        cb(null, true);
    }
});

const uploadProfile = multer({
    storage: profileStorage,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, res, cb) => {
        if(!file.mimetype.startsWith('image/')) {
            return cb(new Error("Only image files are allowed"), false);
        }
        cb(null, true);
    },
});

router.post("/product", authenticateToken, authorizeRole('admin'), uploadProduct.single('image'), uploadController.uploadProductImage);

router.post('/profile', authenticateToken, uploadProfile.single('image'), uploadController.uploadProfilePhoto);

router.delete('/:publicId', authenticateToken, uploadController.deleteImage);

module.exports = router;

