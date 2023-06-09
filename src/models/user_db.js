const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombre: String,
  apellido: String,
  correo_electronico: String,
  contrasena: String,
  task: [
    {
      type: Schema.Types.ObjectId,
      ref: 'task',
    },
  ],
});

module.exports = mongoose.model('user', userSchema);
