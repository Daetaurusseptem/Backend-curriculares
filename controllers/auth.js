const { generarJWT } = require("../helpers/jwt");
const Usuarios = require("../models/Usuarios");
const bcrypt = require('bcrypt');



exports.login = async  (req, resp=Response)=>{
    
    // peticion(req.body.nombre, req.body.pass)  moodle.com/iniciar-sesion nombre paass

    //<form submit:"moodle.com/iniciar-sesions">
    //<input >
    //</form>

    const {email, password} = req.body

    
    try {
        
        const usuarioDB = await Usuarios.findOne({email})

        if(!usuarioDB){
            return resp.status(404).json({
                ok:false,
                msg:'correo invalido'
            })
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return resp.status(400).json({
                ok:false,
                msg:'password invalido'
            })
        }
        
        const token = await generarJWT(usuarioDB.id);
        return resp.status(200).json({
            ok:true,
            token,
            // menu:getMenuFrontEnd(usuarioDB.role)
        })


    } catch (error) {

        return resp.status(500).json({
            okay:false,
            msg:'Porfavor hable con el administrador'+error
        })
    }


}

exports.renewToken = async(req, resp=response)=>{

    const uid = req.uid;

    const token =await generarJWT(uid);

    //return user
    let usuario = await Usuarios.findById(uid);    


    


    return resp.status(200).json({
        ok:true,
        token,
        uid,
        usuario,
        // menu:getMenuFrontEnd(usuario.role)

    });


}