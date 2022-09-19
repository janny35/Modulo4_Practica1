const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  fk_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;