const Usuarios = require("../models/Usuarios")

exports.getEstudiantes= async(req, resp=Response)=>{
    const desde = Number(req.query.desde) || 0;
    const limite = 5
    const [usuarios, total] = await Promise.all([
        Usuarios.find({role:'alumno'})
                .skip(desde)
                .limit( limite )
                .populate('materia')
                ,
                
        Usuarios.countDocuments({role:'alumno'})
    ])
    usuarios.forEach(item=>{
        item.password=''
    })
    return resp.status(200).json({
        ok: true,
        info:'Lista de alumnos',
        usuarios,
        total
    })

}

