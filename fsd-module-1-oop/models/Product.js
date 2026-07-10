/**
 *  FILE INI PERLU DILENGKAPI
 *
 * Product Class (OOP)
 * Base class untuk product management Health E-Commerce
 *
 * Tugas:
 * Buat class Product dengan OOP principles
 */

class Product {
  constructor(name, price, stock, category, manufacturer) {
    this.id = Date.now() + Math.random();
    this.name = name;
    this._price = price;
    this._stock = stock;
    this.category = category;
    this.manufacturer = manufacturer;
    this.createdAt = new Date();
  };

  getInfo() {
    return `${this.name} - Rp.${this._price.toLocaleString('id-ID')}`;
  };

  calculateTotal(q) {
    return this._price * q;
  };
}

module.exports = Product;
