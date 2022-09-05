const express = require("express");
const morgan = require("morgan");
const productRouter = require('./routers/productRoutes');
const app = express();

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// routes
app.use('/api/v1/products', productRouter);

module.exports = app;