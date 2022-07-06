const {Router} =require('express');
const { getEstudiantes } = require('../controllers/alumnos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();


router.get('/',
            validarJWT,
            getEstudiantes);






module.exports = router;