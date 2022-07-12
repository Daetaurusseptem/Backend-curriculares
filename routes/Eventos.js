const {Router} = require('express');
const { crearEvento } = require('../controllers/eventos');
const { createUser, getUsuario, eliminarUsuario, actualizarUsuario, getUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middleware/validar-jwt');

const {check} = require('express-validator');
const { validarCampos } = require('../middleware/validarCampos');

const router = Router();

//POST - Registrar Usuario
router.post('/',
[
    check('nombre','Nombre Obligatorio').not().isEmpty(),
    check('descripcion','Descripcion Obligatoria').not().isEmpty(),
    check('realizador','Realizador Obligatorio').not().isEmpty(),
    check('realizador','Realizador No valido').isMongoId(),
    check('horario.empieza','Horario Obligatorio').not().isEmpty(),
    check('horario.termina','Horario Obligatorio').not().isEmpty(),
    check('horario.empieza','Horario Obligatorio').isISO8601().toDate(),
    check('horario.termina','Horario Obligatorio').isISO8601().toDate(),
    validarCampos
],
crearEvento)

// nombre
// descripcion
// realizador
// horario


module.exports = router;
