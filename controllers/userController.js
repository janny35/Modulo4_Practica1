const crypto = require('crypto');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

// Handlers
exports.agregarUsuario = catchAsync(async (req, res) => {
  console.log('PETICION ==> ', req.body);
  req.body.password = crypto
    .createHash('sha256')
    .update(req.body.password)
    .digest('hex');
  let user;
  try {
    console.log('password hasheado ==> ', req.body.password);
    user = new User(req.body);
    await user.save();
    console.log('usuario creado ==> ', user);
  } catch (error) {
    console.error('error creando ==> ', error.message);
  }
  delete user.password;
  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.obtenerUsuarios = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: users.length,
    data: { users },
  });
});

exports.obtenerUsuarioId = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({
        status: 'Not Found',
      });
    res.status(200).json({
      status: 'success',
      data: { user },
    });
  }
);

exports.borrarUsuarioId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await User.findByIdAndDelete(id);
  if (!result) return res.status(404).json({
    status: 'Not Found',
  });
  res.status(200).json({
    status: 'success',
  });
});

exports.actualizarUsuarioId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const result = await User.findByIdAndUpdate(id, body, {new: true});
  if (!result) return res.status(404).json({
    status: 'Not Found',
  });
  res.status(200).json({
    status: 'success',
  });
});