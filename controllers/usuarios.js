const Usuarios = require("../models/Usuarios")

const bcrypt = require('bcrypt');
const { generarJWT } = require("../helpers/jwt");
const Asistencias = require("../models/Asistencias");
const { default: mongoose } = require("mongoose");
const Materias = require("../models/Materias");
const { count } = require("../models/Materias");


exports.createUser = async (req, resp = Response) => {
    //desestructuracion de informacion para la validacion
    const { email, password } = req.body;


    try {

        const existeEmail = await Usuarios.findOne({ email })

        if (existeEmail) {
            return resp.status(400).json({
                ok: false,
                msg: 'Email invalido'
            })
        }

        const usuarioNuevo = new Usuarios(req.body);
        
        //password encrypt
        const salt = bcrypt.genSaltSync();
        usuarioNuevo.password = bcrypt.hashSync(password, salt);
        
        await usuarioNuevo.save();
        
        const id = usuarioNuevo.id;
        // const asistenciasAlumno = new Asistencias({ alumno:mongoose.Types.ObjectId(id)})
        // await asistenciasAlumno.save()
        const token = await generarJWT(id)

        //Generar middleware de jwt

        return resp.status(200).json({
            ok: true,
            mg: 'todo bien',
            id,
            token
        })
    } catch (error) {
        resp.status(404).json({
            ok: "false",
            msg: `error: ${error}`
        })
    }
}



exports.getUsuarios = async (req, resp) => {

    try {
        const usuariosbd = await Usuarios.find();

        return resp.status(200).json({
            ok: true,
            usuariosbd
        })

    } catch (error) {


        return resp.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado'
        })

    }

}

exports.eliminarUsuario = async (req, resp) => {

    const uid = req.params.id;
    const usuarioEliminar = await Usuarios.findById(uid)
    try {
        if (!usuarioEliminar) {
            return resp.status(404).json({
                ok: false,
                msg: 'No se pudo encontrar al usuario'
            })
        }
        const eliminar = await Usuarios.findByIdAndDelete(uid)

        return resp.status(200).json({
            ok: true,
            msg: "Usuario Eliminado"
        })
    } catch (error) {
        return resp.status(400).json({
            ok: false,
            msg: 'Hubo un error'
        })
    }





}


exports.actualizarUsuario = async (req, resp = response) => {
    //Get the id from the params
    const uid = req.params.id

    //Handle any error with a try catch
    try {
        // Make an instance of our user with his id
        const usuarioDB = await Usuario.findById(uid);

        //TODO validar Token
        //IF the user doesn't exist
        if (!usuarioDB) {
            return resp.status(404).json(
                {
                    ok: true,
                    msg: "usuario no existe"
                }
            )
        }
        //get all the data drom the req and removing password and email fields

        const { password, google, email, ...campos } = req.body;

        //validate if the req.body.email and  the DB emails aren't
        //the same so we can change them

        if (usuarioDB.email !== req.body.email) {
            //then we check if the new email is free
            const existeCorreo = await Usuario.findOne({ email });
            if (existeCorreo) {
                return resp.status(501).json({
                    ok: false,
                    msg: "ese correo ya esta registrado"
                })
            }
        }
        //then we send back the email to the campos object
        campos.email = email;

        const usuarioActualizado = await Usuarios.findByIdAndUpdate(uid, campos, { new: true })

        resp.status(200).json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: "error inesperado"
        })


    }
}

exports.numeroInscritos=async(req,resp)=>{

    const {idMateria} = req.params

    try {
        
        const materiaDB = await Materias.findById(idMateria);
    
        if(!materiaDB){
            return resp.status(404).json({
                ok: false,
                msg: "Materia No existe"
            })
        }
    
        const numeroInscritos = await Materias.findById(idMateria).populate('inscritos');
    
        return resp.status(200).json({
            ok: true,
            numero:numeroInscritos.inscritos.length
        })
    } catch (error) {
        
    }

    
}