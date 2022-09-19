const express = require("express");
const morgan = require("morgan");
const productRouter = require('./routers/productRoutes');
const userRouter = require('./routers/userRoutes');
const authRouter = require('./routers/authRoutes');
const CartRouter = require('./routers/cartRoutes');
const MyError = require('./utils/MyError');

const app = express();

// middleware
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/cart', CartRouter);
app.use("/api/v1/auth", authRouter);

app.all('*', (req, res, next) => {
  next(new MyError('route not found', 404));
});

// recibimos como primer parámetro instancia de MyError
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    res.status(statusCode).json({
      status: status,
      message: err.message,
      stack: err.stack,
    });
  } else { // production
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Server error',
      });
    }
  }
});

module.exports = app;