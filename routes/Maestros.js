const {Router} = require('express');
const { getMaestros } = require('../controllers/maestros');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();


router.get('/',
validarJWT, 
getMaestros);

module.exports = router