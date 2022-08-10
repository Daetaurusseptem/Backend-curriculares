const Router = require('express');
const router= Router();
const {check} = require('express-validator');
const { agregarAsistencia } = require('../controllers/asistencias');
const { login, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validarCampos');

router.put('/:idAlumno',[
    validarJWT
], agregarAsistencia);



module.exports = router

