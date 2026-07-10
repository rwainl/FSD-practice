/**
 * Test Script untuk Product Management OOP
 * Menguji semua OOP concepts
 *
 * Catatan: Project ini adalah tahap awal dari backend Health E-Commerce App.
 * Di modul selanjutnya, classes ini akan digunakan dengan MongoDB dan Express.
 */

const Product = require("./models/Product");
const Vitamin = require("./models/Vitamin");
const ProductFactory = require("./services/ProductFactory");

console.log("=== Testing OOP Concepts ===\n");

// Test 1: Base Product class
console.log("1. Testing Product Base Class:");
const product = new Product("Test Product", 50000, 10, "General", "PT Aiman");
console.log(product.getInfo());
console.log(
  `Total for 3 units: Rp ${product.calculateTotal(3).toLocaleString("id-ID")}`
);
console.log("");

console.log("2. Testing Inheritance (Vitamin):");
const vitaminC = new Vitamin("Vitamin C 1000mg", 85000, 50, "PT Aiman", 1000);
console.log(vitaminC.getInfo());
console.log("");

console.log("3. Testing Factory Pattern:");
const vitD = ProductFactory.createProduct("Vitamin", {
  name: "Vitamin D3",
  price: 120000,
  stock: 30,
  manufacturer: "PT Aila",
  dosage: 2000,
});
console.log(vitD.getInfo());
console.log("");

console.log(" All tests completed!");
console.log(
  "Next: These classes will be integrated dengan MongoDB di Modul 2!"
);
