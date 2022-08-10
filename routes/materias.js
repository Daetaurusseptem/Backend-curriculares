const {Router} = require('express');
const { crearMateria, getMaterias, actualizarMateria, addAlumno, eliminarMateria, getMateria, eliminarInstructor, actualizarAdministradorMateria, getMateriasMaestro, getMateriaAlumnos, eliminarInscrito  } = require('../controllers/materias');
const { validarJWT } = require('../middleware/validar-jwt');

const {check} = require('express-validator');
const { agregarAsistencia, getAsistenciasAlumno, getAsistenciaDiaMateria } = require('../controllers/asistencias');
const { numeroInscritos } = require('../controllers/usuarios');

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

router.get('/:id',[validarJWT], getMateria);


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
router.delete('/eliminar-inscrito/:idMateria/:idAlumno', 
            validarJWT, 
            eliminarInscrito)

router.put('/alumno/:alumnoId/:materiaId', 
            validarJWT,
            addAlumno);
router.get('/materias-maestro/:idMaestro',
            validarJWT,
            getMateriasMaestro)

// router.get('/asistencia/:idMateria/:idAlumno',[validarJWT], getAsistenciaDiaMateria)

// router.put('/asistencia/:idMateria/:idAlumno',[validarJWT], agregarAsistencia)


router.get('/contar/:idMateria',numeroInscritos)


module.exports= router;