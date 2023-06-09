/*const express = require('express');
const router = express.Router();*/

const router = require('express-promise-router')();

const {
  newUser,
  getUserInfoByEmail,
  newUserTask,
  getUserTask,
} = require('../controllers/user_controller');

router.post('/newUser/', newUser);
router.get('/userInfoByEmail/:correo_electronico', getUserInfoByEmail);
router.post('/:idUsuario/newUserTask', newUserTask);
router.get('/:idUsuario/task', getUserTask);

module.exports = router;
