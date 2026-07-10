/**
 *  FILE INI PERLU DILENGKAPI
 *
 * Product Factory (Design Pattern)
 * Centralized product creation untuk Health E-Commerce
 */

// TODO: Import product classes
// const Vitamin = require('../models/Vitamin');
// const Supplement = require('../models/Supplement');

const Vitamin = require('../models/Vitamin');
const Supplement = require('../models/Supplement');

class ProductFactory {
  static createProduct(type, data) {
    switch(type) {
      case 'Vitamin':
        return new Vitamin(
          data.name,
          data.price,
          data.stock,
          data.manufacturer,
          data.dosage,
        );
        break;
      
      case 'Supplement':
        return new Supplement(
          data.name,
          data.price,
          data.stock,
          data.manufacturer,
          data.dosage,
        );
        break;

      default:
        throw new Error(`Unknown product type: ${type}`);
    }
  }
}

module.exports = ProductFactory;
