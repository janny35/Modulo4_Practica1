const Product = require('../models/Product');

// Handlers
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: products.length,
    data: { products },
  });
};

exports.addNewProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(200).json({
    status: 'success',
    data: { product },
  });
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product)
    return res.status(404).json({
      status: 'Not Found',
    });
  res.status(200).json({
    status: 'success',
    data: { product },
  });
};

exports.updateProductById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  await Product.findByIdAndUpdate(id, body, {new: true});
  res.status(200).json({
    status: 'success',
  });
};

exports.deleteProductById = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(200).json({
    status: 'success',
  });
};

