
const Usuarios = require("../models/Usuarios")


exports.agregarAsistencia=async(req,resp)=>{
    const{fecha}= req.body
    const {idAlumno} = req.params

    const alumnoDb = await Usuarios.findById(idAlumno);

    if(!alumnoDb){
        resp.status(500).json({
            ok:false,
            msg:'No se encontro el Alumno'
        })
    }
    const existeAsistencia = await Usuarios.findOne({_id:idAlumno,"asistencias.fecha":fecha},'fecha');
    
    if(existeAsistencia){
        
        const eliminarAsistencia = await Usuarios.findByIdAndUpdate({_id:idAlumno},{$pull:{asistencias:{fecha:fecha}}})

        console.log(eliminarAsistencia);
        return resp.status(200).json({
            ok:false,
            msg:'Fecha Eliminada'
        })
    }
    console.log('Creacion');
    const agregarAsistencia = await Usuarios.findOneAndUpdate({_id:idAlumno}, {$push:{asistencias:{fecha:fecha, asistio:true}}});
    
    return resp.status(200).json({
        ok:false,
        msg:'Fecha creada'
    })

    

}

exports.getAsistencias =async(req, resp)=>{

    const {idAlumno} = req.params

    const alumnoDb = await Usuarios.findById(idAlumno);

    if(!alumnoDb){
        resp.status(500).json({
            ok:false,
            msg:'No se encontro el Alumno'
        })
    }

    const asistencias = await Usuarios.find


}