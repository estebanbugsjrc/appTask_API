const User = require('../models/user_db');
const Task = require('../models/task_db');

module.exports = {
  newUser: async (req, res, next) => {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(200).json({ success: true });
  },

  getUserInfoByEmail: async (req, res, next) => {
    const { correo_electronico } = req.params;
    const user = await User.findOne({ correo_electronico });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const userInfo = {
      id: user._id,
      nombre: user.nombre,
      apellido: user.apellido,
    };
    res.status(200).json(userInfo);
  },

  newUserTask: async (req, res, next) => {
    const { idUsuario } = req.params;
    const newTask = new Task(req.body);
    const user = await User.findById(idUsuario);
    newTask.creador = user;
    await newTask.save();
    user.task.push(newTask._id);
    await user.save();
    res.status(200).json({ success: true });
  },

  getUserTask: async (req, res, next) => {
    const { idUsuario } = req.params;
    const user = await User.findById(idUsuario).populate('task');

    const tasks = user.task.map((task) => ({
      titulo: task.titulo,
      categoria: task.categoria,
      descripcion: task.descripcion,
      fecha_creacion: task.fecha_creacion,
      fecha_vencimiento: task.fecha_vencimiento,
      estado: task.estado,
      creador: task.creador,
    }));

    const userInfo = {
      id: user._id,
      nombre: user.nombre,
      apellido: user.apellido,
      task: tasks,
    };
    res.status(200).json(userInfo);
  },
};
