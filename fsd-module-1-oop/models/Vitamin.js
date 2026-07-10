/**
 * FILE INI PERLU DILENGKAPI
 *
 * Vitamin Class - Extends Product
 * Implementation Inheritance untuk category-specific products
 */

const Product = require('./Product');

class Vitamin extends Product {
  constructor(name, price, stock, manufacturer, dosage) {
    super(name, price, stock, 'Vitamin', manufacturer);
      this.dosage = dosage;
  };

  getInfo() {
    return `${this.name} - ${this._price.toLocaleString('id-ID')}`;
  };
}

module.exports = Vitamin;
