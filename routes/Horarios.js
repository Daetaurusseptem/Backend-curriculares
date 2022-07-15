const {Router} = require('express');
const { crearMateria, getMaterias, actualizarMateria, addAlumno, eliminarMateria, getMateria, eliminarInstructor, actualizarAdministradorMateria,  } = require('../controllers/materias');
const { validarJWT } = require('../middleware/validar-jwt');

const {check} = require('express-validator');
const { agregarHorario, getHorarioMateria } = require('../controllers/horarios');

const router = Router();

router.put('/:id',
            [
                validarJWT
            ],
            agregarHorario);
router.get('/:id',
            [
                validarJWT
            ],
            getHorarioMateria);



module.exports= router;