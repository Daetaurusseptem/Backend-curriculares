const { findByIdAndUpdate } = require("../models/Usuarios");
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

exports.getAlumno = async(req,resp)=>{
    const {id} = req.params

    try {
        const alumnoDB = await Usuarios.findById(id)
                                       .populate('materia')
        if(!alumnoDB){
            return resp.status(404).json({
                ok:false,
                msg:'Hubo un error Inesperado'
            })
        }
        return resp.status(200).json({
            ok:true,
            alumno:alumnoDB
        })
        

    } catch (error) {
        return resp.status(500).json({
            ok:false,
            msg:'Hubo un error Inesperado'
        })
    }

}

exports.updateAlumno = async (req, resp)=>{

    const {id} = req.params;

    try {
        const alumnoDB = await Usuarios.findById(id)
        if(!alumnoDB){
            return resp.status(404).json({
                ok:false,
                msg:'No se ha encontrado el alumno'
            })    
        }
        const alumno = req.body
        console.log(alumno);

        const alumnoActualizado = await Usuarios.findByIdAndUpdate(id, alumno, {new:true})
        return resp.status(200).json({
            ok:true,
            alumnoActualizado
        })

    } catch (error) {
        return resp.status(500).json({
            ok:false,
            msg:'Ha ocurrido un error inesperado'+error
        })
    }

}
