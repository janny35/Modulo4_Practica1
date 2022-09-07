const express = require("express");
const productController = require('../controllers/productController');
const productRouter = express.Router();

// routes
productRouter.route('/')
  .get(productController.getAllProducts)
  .post(productController.addNewProduct);
  productRouter.route('/:id')
 .get(productController.getProductById)
 .put(productController.updateProductById)
 .delete(productController.deleteProductById);

module.exports = productRouter;