const Eventos = require("../models/eventos")

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
    const uid = req.params.id

    //Handle any error with a try catch
    try {
        // Make an instance of our user with his id
        const eventoDB = await Usuario.findById(uid);

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
  


        const usuarioActualizado = await Usuarios.findByIdAndUpdate(uid, campos, { new: true })

        resp.status(200).json({
            ok: true,
            msg:'Evento Actualizado',
            registroActualizado:usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: "error inesperado"
        })


    }
}
