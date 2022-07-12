const {Router} = require('express');
const { getMaestros, updateMaestro, getMaestro } = require('../controllers/maestros');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();


router.get('/',
validarJWT, 
getMaestros);

router.get('/:id',
validarJWT, 
getMaestro);

router.put('/:id',
validarJWT, 
updateMaestro);


module.exports = router