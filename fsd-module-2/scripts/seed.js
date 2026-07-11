/**
 *  FILE INI PERLU DILENGKAPI
 *
 * Database Seeding Script
 * Mengisi database dengan sample data
 *
 * Tugas:
 * 1. Import dependencies
 * 2. Buat array products (min 10 products)
 * 3. Connect ke database
 * 4. Delete existing products
 * 5. Insert sample products
 * 6. Log progress
 * 7. Exit
 */

// TODO: Import dependencies
// require('dotenv').config();
// const mongoose = require('mongoose');
// const Product = require('../models/Product');
// const connectDB = require('../config/database');
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/database');

// TODO: Buat array sample products
const products = [
 {
    name: "Vitamin C 1000mg",
    description:
      "Suplemen vitamin C untuk meningkatkan daya tahan tubuh dan melindungi sel dari radikal bebas",
    category: "Vitamin",
    price: 85000,
    stock: 50,
    manufacturer: "PT Aiman",
  },
  {
    name: "Vitamin D3 2000 IU",
    description:
      "Suplemen vitamin D untuk kesehatan tulang dan sistem kekebalan tubuh",
    category: "Vitamin",
    price: 120000,
    stock: 30,
    manufacturer: "PT Aila",
  },
  {
    name: "Multivitamin Complete",
    description: "Multivitamin lengkap untuk memenuhi kebutuhan nutrisi harian",
    category: "Vitamin",
    price: 150000,
    stock: 40,
    manufacturer: "PT Aiman",
  },
  {
    name: "Vitamin B Complex",
    description: "Kombinasi vitamin B untuk energi dan metabolisme",
    category: "Vitamin",
    price: 95000,
    stock: 45,
    manufacturer: "PT Aila",
  },
  {
    name: "Omega-3 Fish Oil",
    description: "Suplemen minyak ikan untuk kesehatan jantung dan fungsi otak",
    category: "Supplement",
    price: 200000,
    stock: 25,
    manufacturer: "PT Aiman",
  },
  {
    name: "Glucosamine & Chondroitin",
    description: "Suplemen untuk kesehatan sendi dan tulang rawan",
    category: "Supplement",
    price: 180000,
    stock: 20,
    manufacturer: "PT Aila",
  },
  {
    name: "Probiotics 10 Billion CFU",
    description: "Suplemen probiotik untuk kesehatan pencernaan",
    category: "Supplement",
    price: 165000,
    stock: 35,
    manufacturer: "PT Aiman",
  },
  {
    name: "Zinc Supplement 50mg",
    description: "Suplemen zinc untuk mendukung sistem kekebalan tubuh",
    category: "Supplement",
    price: 75000,
    stock: 40,
    manufacturer: "PT Aila",
  },
  {
    name: "Termometer Digital",
    description:
      "Termometer digital akurat untuk mengukur suhu tubuh dengan cepat",
    category: "Medical Equipment",
    price: 75000,
    stock: 60,
    manufacturer: "PT Aiman",
  },
  {
    name: "Blood Pressure Monitor",
    description: "Alat pengukur tekanan darah digital otomatis",
    category: "Medical Equipment",
    price: 350000,
    stock: 15,
    manufacturer: "PT Aila",
  },
  {
    name: "Masker Medis 3 Ply",
    description: "Masker medis 3 lapis untuk perlindungan maksimal",
    category: "Medical Equipment",
    price: 50000,
    stock: 100,
    manufacturer: "PT Aiman",
  },
  {
    name: "Paracetamol 500mg",
    description: "Obat pereda nyeri dan penurun demam",
    category: "Medicine",
    price: 15000,
    stock: 200,
    manufacturer: "PT Aila",
  },
];

// TODO: Fungsi seeding
async function seedDatabase() {
  try {
    // TODO: Connect to database
    await connectDB();
    // TODO: Delete existing products
    await Product.deleteMany();
    console.log('Existing products deleted');
    // TODO: Insert new products
    // const created = await Product.insertMany(products);
    const created = await Product.insertMany(products);
    console.log(`${created.length} products inserted`);
    // TODO: Log sample product IDs
    console.log("\nSample Product IDs:");
    createdProducts.slice(0, 3).forEach((product) => {
      console.log(`   - ${product.name}: ${product._id}`);
    });
    // TODO: Exit
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

// TODO: Call seedDatabase();
seedDatabase();
