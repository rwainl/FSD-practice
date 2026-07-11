/**
 *  FILE INI PERLU DILENGKAPI
 *
 * User Model
 * Schema untuk user/customer
 *
 * Tugas:
 * 1. Buat schema dengan fields yang diminta
 * 2. Tambahkan virtual 'fullName'
 * 3. Tambahkan timestamps
 */

// TODO: Import mongoose
const mongoose = required('mongoose');

// TODO: Define userSchema
/*
Fields:
- firstName: String, required
- lastName: String, required
- email: String, required, unique, lowercase, trim
- password: String, required, minlength 6
- role: String, enum ['user', 'admin'], default 'user'
*/
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name required"],
        },
        lastName: {
            type: String,
            required: [true, "Last name required"],
        },
        email: {
            type: String,
            required: [true, "Email required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Email tidak valid"],
        },
        password: {
            type: String,
            required: [true, "Password required"],
            linlength: [6, "Min. 6 characters"]
        },
        role: {
            type: String,
            enum: ["User", "Admin"],
            default: "User",
        },
        isActive: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
    }
)

// TODO: Tambahkan virtual 'fullName'
// Hint:
// userSchema.virtual('fullName').get(function() {
//   return `${this.firstName} ${this.lastName}`;
// });
userSchema.virtual('fullname').get(() => {
    return `${this.firstName} ${this.lastname}`;
});

// TODO: Opsional - Pre-save middleware untuk hash password
// (Akan dipelajari lebih detail di Modul 4 - Authentication)

// TODO: Export model
module.exports = userSchema;