const express = require("express");
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const userRouter = express.Router();

// routes
userRouter.route('/')
  // .all(authController.protect)
  .get(authController.protect, userController.obtenerUsuarios)
  .post(userController.agregarUsuario);
userRouter.route('/:id')
  .all(authController.protect)
  .get(userController.obtenerUsuarioId)
  .delete(userController.borrarUsuarioId)
  .put(userController.actualizarUsuarioId);

module.exports = userRouter;