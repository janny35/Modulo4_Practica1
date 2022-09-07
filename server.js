const app = require('./app');

const port = process.env.PORT;
const dbUrl = process.env.MONGO;
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO)
  .then((con) => {
    console.log('primer coneccion a MONGO');
  });
app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port}`);
 });