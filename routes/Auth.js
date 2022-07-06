const Router = require('express');
const router= Router();
const {check} = require('express-validator');
const { login, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validarCampos');

router.post('/',[
    check('email','Porfavor ingrese el correo'),
    check('password','Porfavor ingrese password'),
    validarCampos
], login);

router.get('/renew',
[
    validarJWT
],
    renewToken
)


module.exports = router

