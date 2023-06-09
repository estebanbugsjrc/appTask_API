const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  titulo: String,
  categoria: String,
  descripcion: String,
  fecha_creacion: String,
  fecha_vencimiento: String,
  estado: String,
  creador: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model('task', taskSchema);
