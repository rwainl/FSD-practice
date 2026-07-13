/**
 * Database Configuration
 *
 * TODO untuk Peserta:
 * 1. Import mongoose
 * 2. Buat fungsi connectDB untuk koneksi ke MongoDB
 * 3. Handle error connection
 * 4. Log success message saat berhasil connect
 */

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected: ${conn.connection.host}`);
    console.log("  TODO: Implement MongoDB connection");
  } catch (error) {
    console.error(` MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
