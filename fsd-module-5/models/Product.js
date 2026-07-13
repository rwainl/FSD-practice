/**
 * Product Model
 * 
 * TODO untuk Peserta:
 * 1. Buat schema untuk Product
 * 2. Tambahkan field: name, description, category, price, stock, manufacturer
 * 3. Tambahkan field khusus: kemenkesId (untuk data dari Kemenkes API)
 * 4. Tambahkan timestamps
 * 5. Create dan export model
 */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name required"],
            trim: true,
            maxLength: [100, "Max characters 100"],
        },
        description: {
            type: String,
            required: [true, "Product description required"],
        },
        category: {
            type: String,
            required: [true, "Product category required"],
            enum: ["Vitamin", "Supplement", "Medicine", "Medical Equipment", "Other"],
        },
        price: {
            type: Number,
            required: [true, "Product price required"],
            min: [0, "Minimum price 0"],
        },
        stock: {
            type: Number,
            required: [true, "Product stock required"],
            min: [0, "Minimum stock 0"],
        },
        manufacturer: {
            type: String,
            required: [true, "Manufacturer required"],
        },
        kemenkesId: {
            type: String,
            unique: true,
            sparse: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Product", productSchema);

// TODO: Implement Product Schema
// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Nama produk wajib diisi'],
//     trim: true,
//     maxlength: [100, 'Nama maksimal 100 karakter']
//   },
//   description: {
//     type: String,
//     required: [true, 'Deskripsi wajib diisi']
//   },
//   category: {
//     type: String,
//     required: [true, 'Kategori wajib diisi'],
//     enum: ['Vitamin', 'Supplement', 'Medicine', 'Medical Equipment', 'Other']
//   },
//   price: {
//     type: Number,
//     required: [true, 'Harga wajib diisi'],
//     min: [0, 'Harga harus positif']
//   },
//   stock: {
//     type: Number,
//     required: [true, 'Stock wajib diisi'],
//     min: [0, 'Stock tidak boleh negatif'],
//     default: 0
//   },
//   manufacturer: {
//     type: String,
//     required: [true, 'Manufacturer wajib diisi']
//   },
//   // Field khusus untuk Kemenkes integration
//   kemenkesId: {
//     type: String,
//     unique: true,
//     sparse: true
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Product', productSchema);

// Temporary export (replace dengan implementasi di atas)
// module.exports = {};

