const { Router } = require('express');
const { crearEvento, getEventos, actualizarEvento, eliminarEvento, getEvento, eliminarRealizadorEvento, actualizarRealizadorEvento } = require('../controllers/eventos');
const { createUser, getUsuario, eliminarUsuario, actualizarUsuario, getUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middleware/validar-jwt');

const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validarCampos');

const router = Router();

//POST - Registrar Usuario
router.post('/',
    [
        check('nombre', 'Nombre Obligatorio').not().isEmpty(),
        check('descripcion', 'Descripcion Obligatoria').not().isEmpty(),
        check('realizadores', 'Realizador Obligatorio').not().isEmpty(),
        check('realizadores', 'Realizador No valido').isMongoId(),
        check('horario.empieza', 'Horario Obligatorio').not().isEmpty(),
        check('horario.termina', 'Horario Obligatorio').not().isEmpty(),
        check('horario.empieza', 'Horario Obligatorio').isISO8601().toDate(),
        check('horario.termina', 'Horario Obligatorio').isISO8601().toDate(),
        validarCampos
    ],
    crearEvento)


router.get('/',
    validarJWT,
    getEventos
)
router.get('/:id',
    validarJWT,
    getEvento
)

router.put('/:id',
    validarJWT,
    actualizarEvento
)

router.delete('/:id',
    validarJWT,
    eliminarEvento
)

router.put('/actualizarRealizador/:id', 
            validarJWT,
            actualizarRealizadorEvento);

router.delete('/:idEvento/:idUsuario', 
            validarJWT, 
            eliminarRealizadorEvento)


// nombre
// descripcion
// realizador
// horario


module.exports = router;
