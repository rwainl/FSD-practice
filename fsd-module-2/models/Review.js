/**
 *  FILE INI PERLU DILENGKAPI
 *
 * Review Model
 * Schema untuk product reviews
 *
 * Tugas:
 * 1. Buat schema dengan reference ke Product dan User
 * 2. Tambahkan validation
 * 3. Tambahkan timestamps
 */

// TODO: Import mongoose
const mongoose = require('mongoose');

// TODO: Define reviewSchema
/*
Fields:
- productId: ObjectId, ref 'Product', required
- userId: ObjectId, ref 'User', required  
- rating: Number, required, min 1, max 5
- comment: String
- isVerified: Boolean, default false
*/
const reviewSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, "productId required"],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "userId required"],
        },
        rating: {
            type: Number,
            required: true,
            min: [0, "Minimum rating 1"],
            max: [5, "Maximal rating 1"],
        },
        comment: {
            type: String,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// reviewSchema.index({ productId: 1, createdAt: 1 });

// TODO: Export model
module.exports = reviewSchema;