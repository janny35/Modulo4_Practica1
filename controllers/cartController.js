
// Controlador Carrito 
const Cart = require('../models/Cart');
const catchAsync = require('../utils/catchAsync');



exports.addCart = catchAsync(async (req, res) => {
  const idUsuario = req.user._id;
  const { idProducto, cantidad } = req.body;
  let carrito;
  const carritos = await Cart.find({
    fk_user: idUsuario,
  });
  if (carritos.lenght === 0) {
    carrito = new Cart({
      fk_user: idUsuario,
      status: 'PENDING',
      products: [{
        idProducto,
        cantidad,
      }]
    });
  } else {
    carrito = carritos.find((carrito) => carrito.status === 'PENDING');
    if (carrito) {
      carrito.products.push({
        idProducto,
        cantidad,
      });
    } else {
      carrito = new Cart({
        fk_user: idUsuario,
        status: 'PENDING',
        products: [{
          idProducto,
          cantidad,
        }]
      });
    }
  }
  await carrito.save();

  res.status(200).json({
    status: 'success',
    data: { carrito },
  });
});

exports.deleteCart = catchAsync(
  async (req, res) => {
    const { idProducto } = req.params;
    const idUsuario = req.user._id;
    const carritos = await Cart.find({
      fk_user: idUsuario,
    });
    if (carritos.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
      });
    }
    const carrito = carritos.find((carrito) => carrito.status === 'PENDING');
    if (!carrito) {
      return res.status(404).json({
        status: 'Not Found',
      });
    }
    carrito.products = carrito.products.filter((producto) => producto.idProducto !== idProducto);
    await carrito.save();
    res.status(200).json({
      status: 'success',
      data: { carrito },
    });
  }
);

exports.payCart = catchAsync(async (req, res) => {
  const { idCarrito } = req.params;
  const carrito = await Cart.findById(idCarrito);
  if (!carrito) return res.status(404).json({
    status: 'Not Found',
  });
  if (carrito.products.length > 0){
    carrito.status = 'PAID';
    await carrito.save();
    res.status(200).json({
      status: 'success',
      data: { carrito },
    });
  }else{
    res.status(400).json({
      status: 'no se puede pagar el carrito porque no selecciono un producto',
    });
  }
 
});
git 