/**
 * Cloudinary Configuration
 *
 * TODO untuk peserta:
 * 1. Install cloudinary: npm install cloudinary
 * 2. Import cloudinary: const cloudinary = require('cloudinary').v2;
 * 3. Configure dengan environment variables:
 *    - CLOUDINARY_CLOUD_NAME
 *    - CLOUDINARY_API_KEY
 *    - CLOUDINARY_API_SECRET
 * 4. Validate configuration (check jika env vars ada)
 * 5. Export cloudinary instance
 *
 * Reference: ../finished-project/config/cloudinary.js
 */

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
if(!process.env.CLOUDINARY_CLOUD_NAME) {
    console.warn('Cloudinary credentials not set');
}

module.exports = cloudinary;