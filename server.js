const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.error('uncaughtException ' + err.message);
  console.error('Shutting down');
  process.exit(1);
});

const app = require('./app');
const port = process.env.PORT;

mongoose.connect(process.env.MONGO);

const server = app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port}`);
});

process.on('unhandledRejection', err => {
  console.error('unhandledRejection ' + err.message);
  console.error('Shutting down');
  server.close(() => {
    process.exit(1);
  });
});
