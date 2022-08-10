const Eventos = require("../models/Eventos");
const Usuarios = require("../models/Usuarios");

exports.getEventos= async(req,resp)=>{

    try {
        
        const getEventos = await Eventos.find();

        return resp.status(200).json({
            ok:true,
            eventos:getEventos
        })

    } catch (error) {
        return resp.status(500).json({
            ok:false,
            msg:'Hubo un error, contacte con el administrador'
        })
    }

}
exports.getEvento=async(req, resp)=>{
    const id = req.params.id
    
    const evento = await Eventos.findById(id)
                                  .populate('asistira', 'nombre apellido1 apellido2 img email')
                                  .populate('realizadores')
                                  
    try {
        if(!evento){
            return resp.status(404).json({
                ok:false,
                msg:'Este evento no existe'
            })
        }
        
        return resp.status(200).json({
            ok:true,
            evento
        })
        
    } catch (error) {
        
        return resp.status(500).json({
            ok:true,
            msg:'Hubo un error inesperado'
        })
    }

}
exports.crearEvento =(req,resp)=>{
    try {
        const nuevoEvento = new Eventos(req.body)
        if(!nuevoEvento){
            return resp.status(200).json({
                ok:false,
                msg:'Error no se encontro evento'
            })
        }
        nuevoEvento.save();
        return resp.status(200).json({
            ok:true,
            evento:nuevoEvento
        })
    } catch (error) {
        return resp.status(500).json({
            ok:true,
            msg:'Ha ocurrido un error'
        })
    }


}

exports.eliminarEvento = async (req, resp) => {

    const uid = req.params.id;
    const eventoDB = await Eventos.findById(uid)
    try {
        if (!eventoDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'No se pudo encontrar al usuario'
            })
        }
        const eliminarEvento = await Eventos.findByIdAndDelete(uid)

        return resp.status(200).json({
            ok: true,
            msg: "Evento Eliminado"
        })
    } catch (error) {
        return resp.status(400).json({
            ok: false,
            msg: 'Hubo un error'
        })
    }





}

exports.actualizarEvento = async (req, resp) => {
    //Get the id from the params
    const eventoId= req.params.id

    //Handle any error with a try catch
    try {
        // Make an instance of our user with his id
        const eventoDB = await Eventos.findById(eventoId);

        //TODO validar Token
        //IF the user doesn't exist
        if (!eventoDB) {
            return resp.status(404).json(
                {
                    ok: true,
                    msg: "evento no existe"
                }
            )
        }
  


        const usuarioActualizado = await Eventos.findByIdAndUpdate(eventoId, req.body, { new: true })

        resp.status(200).json({
            ok: true,
            msg:'Evento Actualizado',
            registroActualizado:usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: "error inesperado"+error
        })


    }
}

exports.eliminarRealizadorEvento= async(req,resp)=>{
    const {idEvento, idUsuario}=req.params
    try {
        const eventoDb = await Eventos.findById({_id:idEvento});
        console.log(eventoDb);
        if(!eventoDb){
            return resp.status(404).json({
                ok:true,
                msg:'No se encontro el evento'
            })
        }
        const eliminarRealizador = await Eventos.findByIdAndUpdate({_id:idEvento}, {$pullAll:{realizadores:[{_id:idUsuario}]}})

        return resp.status(200).json({
            ok:true,
            msg:'Actualizado',

        })  
    } catch (error) {
        return resp.status(404).json({
            ok:true,
            msg:'Hubo un error inesperado'+error
        })
    }
}

//actualizarRealizadorEvento

exports.actualizarRealizadorEvento = async(req,resp=Response)=>{
    const {id} = req.params
    const eventoDB= await Eventos.findById(id);
    
    
    try {
        if(!eventoDB){
            
            return resp.status(404).json({
                ok:true,
                msg:'No se encontro el evento'
            })
        }
        //Agregar Instructor
        if(req.body.realizadores){
            console.log('admin agregar');
            const nuevoRealizador= req.body.realizadores;
            const actualizarRealizador = await Eventos.findByIdAndUpdate({_id:id}, {$push:{"realizadores":nuevoRealizador}}, {new:true})
            
        }

        return resp.status(200).json({
            ok:true,
            msg:'Actualizado',

        })        
    } catch (error) {
        resp.status(404).json({
            ok:false,
            msg:'Hubo un error inesperado'+error
        })
    }
}


exports.addAsistenciaEvento = async(req, resp)=>{

    const {idAlumno, idEvento} = req.params
try {
    
    const eventoDb = await Eventos.findById(idEvento);
    const usuarioDb = await Usuarios.findById(idAlumno);
    
    if(!eventoDb){
        return resp.status(404).json({
            ok: false,
            msg: "No se encontro el evento"
        })
    }
    if(!usuarioDb){
        return resp.status(404).json({
            ok: false,
            msg: "No se encontro el usuario"
        })
    }
    
    const agregarAsistencia = await Eventos.findByIdAndUpdate({_id:idEvento}, {$push:{"asistira":idAlumno}}, {new:true});
    return resp.status(200).json({
        ok:true,
        msg:'Usuario Agregado',
    }) 
} catch (error) {
    return resp.status(200).json({
        ok:false,
        msg:'Hubo un error',error
    }) 
}




}

exports.comprobarAsistenciaEvento=async(req, resp)=>{
    const {idUsuario, idEvento} = req.params;

    try {
        const eventoDb = await Eventos.findById(idEvento);
        const usuarioDb = await Usuarios.findById(idUsuario);
        
        if(!eventoDb){
            return resp.status(404).json({
                ok: false,
                msg: "No se encontro el evento"
            })
        }
        if(!usuarioDb){
            return resp.status(404).json({
                ok: false,
                msg: "No se encontro el usuario"
            })
        }
    
        const comprobarAsistenciaUsuario = await Eventos.find({_id:idEvento, asistira:idUsuario})
    
        if(!comprobarAsistenciaUsuario){
            return resp.status(200).json({
                asistencia:false
            })
        }
        return resp.status(200).json({
            asistencia:true
        })
        
    } catch (error) {
        return resp.status(404).json({
            ok: false,
            msg: "Hubo un error Inesperado"
        })
    }
    

}
