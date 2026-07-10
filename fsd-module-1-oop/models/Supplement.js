const Product = require('./Product');

class Suplement extends Product {
    constructor(name, price, stock, manufacturer, dosage) {
        super(name, price, stock, 'Supplement', manufacturer);
        this.dosage = dosage;
    };

    getInfo() {
        return `${this.name} - ${this._price.toLocaleString('id-ID')}`;
    };

}