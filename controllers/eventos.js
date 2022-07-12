const Eventos = require("../models/eventos")

exports.crearEvento =(req,resp)=>{
    try {
        const nuevoEvento = new Eventos(req.body)
        if(!nuevoEvento){
            return resp.status(200).json({
                ok:false,
                nuevoEvento
            })
        }
        nuevoEvento.save();
        return resp.status(200).json({
            ok:true,
            nuevoEvento
        })
    } catch (error) {
        return resp.status(500).json({
            ok:true,
            msg:'Ha ocurrido un error'
        })
    }


}