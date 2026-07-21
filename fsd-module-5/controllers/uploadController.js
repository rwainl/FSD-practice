/**
 * Upload Controller
 * 
 * TODO untuk peserta:
 * 1. Import cloudinary config
 * 2. Implement uploadProductImage (Admin only):
 *    - Get file dari req.file (dari multer middleware)
 *    - Upload ke Cloudinary
 *    - Return imageUrl dan publicId
 * 
 * 3. Implement uploadProfilePhoto:
 *    - Get user dari req.user
 *    - Get file dari req.file
 *    - Upload ke Cloudinary
 *    - Update user profilePhoto
 *    - Save user
 *    - Return imageUrl
 * 
 * 4. Implement deleteImage:
 *    - Get publicId dari params
 *    - Delete dari Cloudinary
 *    - Return success
 * 
 * Reference: ../finished-project/controllers/uploadController.js
 */

const cloudinary = require('../config/cloudinary');
const User = require('../models/User');

exports.uploadProductImage = async(req, res) => {
    try {
        if(!req.files) {
            return res.status(400).json({
                success: false,
                message: "No file attached",
            });
        }

        const imageUrl = req.file.path;

        return res.status(200).json({
            success: true,
            message: "Image uploaded",
            imageUrl,
            filename: req.file.filename,
            publicId: req.file.public_id,
        });
    } catch (error) {
        console.error("Error upload product image");
        return res.status(500).json({
            success: false,
            message: "Failed uploading product image",
        });
    }
}

exports.uploadProfilePhoto = async(req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file attached",
            }); 
        }

        const user = await User.findById(req.user.id);

        if(user.profilePhoto && user.profilePhoto.includes('cloudinary')) {
            try {
                const urlParts = user.profilePhoto.split('/');
                const publicIdWithExit = urlParts[urlParts.length - 1];
                const publicId = publicIdWithExit.split('.')[0];
                const folderPath = `health-ecommerce/profiles/${publicId}`;

                await cloudinary.uploader.destroy(folderPath);
            } catch (error) {
                console.warn("Failed to delete old photo", error.message);
            }
        }

        user.profilePhoto = req.file.path;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile photo updated",
            imageUrl: req.file.path,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePhoto: user.profilePhoto,
            }
        });
    } catch (error) {
        console.error("Error upload profile photo");
        return res.status(500).json({
            success: false,
            message: "Failed uploading profile photo",
        });
    }
};

exports.deleteImage = async(req, res) => {
    try {
        const { publicId } = req.params;
        await cloudinary.uploader.destroy(publicId);

        return res.status(200).json({
            success: true,
            message: "Image deleted",
        });
    } catch (error) {
        console.error("Error delete image");
        return res.status(500).json({
            success: false,
            message: "Failed deleting image",
        });
    }
}

// TODO: Import dependencies
// const cloudinary = require('../config/cloudinary');
// const User = require('../models/User');

// TODO: Upload Product Image (Admin only)
// exports.uploadProductImage = async (req, res) => {
//   try {
//     // Get file from req.file
//     // Upload to Cloudinary
//     // Return imageUrl and publicId
//   } catch (error) {
//     // Error handling
//   }
// };

// TODO: Upload Profile Photo
// exports.uploadProfilePhoto = async (req, res) => {
//   try {
//     // Get user and file
//     // Upload to Cloudinary
//     // Update user profilePhoto
//     // Save user
//     // Return imageUrl
//   } catch (error) {
//     // Error handling
//   }
// };

// TODO: Delete Image
// exports.deleteImage = async (req, res) => {
//   try {
//     // Get publicId
//     // Delete from Cloudinary
//     // Return success
//   } catch (error) {
//     // Error handling
//   }
// };

