const { response, request } = require('express');
const jwt  = require('jsonwebtoken');
 
exports.validarJWT = (req = request, resp = response, next)=>{

    const token = req.header('x-token');

    if(!token){
        return resp.status(401).json({
            ok:false,
            msg:`no hay token en la validacion`
        });
    }

    try {

        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next();
        
    } catch (error) {
        return resp.status(401).json({
            ok:false,
            msg:"token no valido"
        });
    }

}

// exports.validarAdminRole=async(req,resp,next)=>{
//     const uid =req.uid;
//     try {
        
//         const usuarioDB = await Usuarios.findById(uid)
//         if(!usuarioDB){
//             return resp.status(404).json({
//                 ok:false,
//                 msg:'Usuario no existe'
//             })
//         }
        
//         if(usuarioDB.role !=='ADMIN_ROLE'){
//             return resp.status(404).json({
//                 ok:false,
//                 msg:'Usuario no autorizado'
//             })
//         }
//         next();
//     } catch (error) {
//         if(!usuarioDB){
//             resp.status(500).json({
//                 ok:false,
//                 msg:'Hubo un error inesperado'
//             })
//         }
//     }

// }