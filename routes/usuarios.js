const {Router} = require('express');
const { createUser, getUsuario, eliminarUsuario, actualizarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

//POST - Registrar Usuario
router.post('/',[

], createUser)
//POST - Crear Maestro
router.post('/maestro',[
validarJWT
], createUser)

//GET - Obtener Usuarios de la base de Datos
router.get('/',validarJWT, getUsuario);

//DELETE
router.delete('/:id', eliminarUsuario);

//UPDATE - actualizar Usuario
router.put('/:id', actualizarUsuario);



module.exports = router;
