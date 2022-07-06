const {Router} = require('express');
const { crearMateria, getMaterias, actualizarMateria, addAlumno, eliminarMateria, getMateria,  } = require('../controllers/materias');

const router = Router();

router.post('/', crearMateria);

router.get('/', getMaterias);

router.get('/:id', getMateria);

router.delete('/:id', eliminarMateria);

router.put('/:id', actualizarMateria);

router.put('/alumno/:alumnoId/:materiaId', addAlumno);

module.exports= router;