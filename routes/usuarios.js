const {Router} = require('express');
const { createUser, getUsuario, eliminarUsuario, actualizarUsuario, getUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middleware/validar-jwt');


const {check} = require('express-validator');
const { validarCampos } = require('../middleware/validarCampos');

const router = Router();

//POST - Registrar Usuario
router.post('/',[
    check('nombre','Nombre requerido').not().isEmpty(),
    check('apellido1','Apellido requerido').not().isEmpty(),
    check('email','Contrasena requerida').not().isEmpty(),
    check('password','Contrasena requerida').not().isEmpty(),
    validarCampos
], createUser)

//POST - Crear Maestro
router.post('/maestro',[
validarJWT
], createUser)

//GET - Obtener Usuarios de la base de Datos
router.get('/',validarJWT, getUsuarios);

//DELETE
router.delete('/:id', eliminarUsuario);

//UPDATE - actualizar Usuario
router.put('/:id', actualizarUsuario);



module.exports = router;
