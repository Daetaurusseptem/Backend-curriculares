const {Router} = require('express');
const { crearMateria, getMaterias, actualizarMateria, addAlumno, eliminarMateria, getMateria, eliminarInstructor, actualizarAdministradorMateria,  } = require('../controllers/materias');
const { validarJWT } = require('../middleware/validar-jwt');

const {check} = require('express-validator');

const router = Router();

router.post('/',
            [
                validarJWT,
                check('nombre').not().isEmpty(),
                check('descripcion').not().isEmpty(),
                check('administradores').not().isEmpty(),
            ],
            crearMateria);

router.get('/', getMaterias);

router.get('/:id', getMateria);

router.delete('/:id',
            validarJWT,
            eliminarMateria);

router.put('/:id', 
            validarJWT,  
            actualizarMateria);

router.put('/actualizarAdmin/:id', 
            validarJWT,
            actualizarAdministradorMateria);

router.delete('/:idMateria/:idUsuario', 
            validarJWT, 
            eliminarInstructor)

router.put('/alumno/:alumnoId/:materiaId', 
            validarJWT,
            addAlumno);

module.exports= router;