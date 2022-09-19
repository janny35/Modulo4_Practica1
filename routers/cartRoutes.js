const express = require("express");
const CartController = require('../controllers/CartController');
const authController = require('../controllers/authController');
const cartRouter = express.Router();

// routes

cartRouter.route('/')
  .all(authController.protect)
  .post(CartController.addCart);
cartRouter.route('/:idProducto')
  .all(authController.protect)
  .delete(CartController.deleteCart);
cartRouter.route('/:idCarrito')
  .all(authController.protect)
  .post(CartController.payCart);

module.exports = cartRouter;