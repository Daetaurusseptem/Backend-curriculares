const {Router} =require('express');
const { busquedaCtrller, busquedaDocumentoColeccion } = require('../controllers/busqueda');
const { validarJWT } = require('../middleware/validar-jwt');


const router = Router();
router.get('/:busqueda', 
            [
                validarJWT
            ],
             busquedaCtrller
            )
router.get('/coleccion/:coleccion/:busqueda', 
            [
                validarJWT
            ],
            busquedaDocumentoColeccion
            )



module.exports = router;
