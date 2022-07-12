
/*
 /api/upload/
 */
 const {Router}= require('express');
 
 const {validarJWT} = require('../middleware/validar-jwt')
 
 
 
 
 const router = Router();
 
 
 const { fileUpload, getImagen } = require('../controllers/upload');
 
 
 
 
 router.post('/imagen/:tipo/:id', 
             [
                 validarJWT
             ],
             fileUpload
             )
 router.get('/imagen/:tipo/:imagen',
             getImagen
             )
 
 
 
 
 module.exports = router;