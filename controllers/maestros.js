const Usuarios = require("../models/Usuarios");

exports.getMaestros= async(req, resp=Response)=>{
    const desde = Number(req.query.desde) || 0;
    const limite = 5
    const [usuarios, total] = await Promise.all([
        Usuarios.find({role:'maestro'})
                .skip(desde)
                .limit( limite )
                ,
                
        Usuarios.countDocuments({role:'maestro'})
    ])
    usuarios.forEach(item=>{
        item.password=''
    })
    return resp.status(200).json({
        ok: true,
        info:'Lista de maestros',
        usuarios,
        total
    })

}
