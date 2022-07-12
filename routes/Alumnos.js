const {Router} =require('express');
const { getEstudiantes, getAlumno, updateAlumno } = require('../controllers/alumnos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();


router.get('/',validarJWT,getEstudiantes);

router.get('/:id',validarJWT,getAlumno);

router.put('/:id', validarJWT, updateAlumno)
            






module.exports = router;