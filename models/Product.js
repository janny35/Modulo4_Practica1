const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'el precio es requerido'],
  },
  description: {
    type: String,
    required: false,
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;