const Materias= require("../models/Materias");
const Usuarios = require("../models/Usuarios");

exports.crearMateria = async (req, resp)=>{
    try {
        const {nombre}=req.body
        const materiaNombreValidacion = await Materias.findOne({nombre});
        console.log(materiaNombreValidacion);
        if (materiaNombreValidacion) {
          return  resp.status(500).json({
            ok:false,
            msg:"Nombre de materia ya registrado"}
        )
        }
        const materia = await Materias.create(req.body);                                   
        return resp.status(200).json({
            ok:true,
            msg:"Todos correcto",
            materia
        }
        )
    } catch (error) {
        resp.status(500).json({
            ok:true,
            msg:"Hubo un error inesperado"+error
        })
    }

}
exports.eliminarMateria = async (req, resp) => {

    const id = req.params.id;
    const materiaEliminar = await Materias.findById(id)
    try {
        if (!materiaEliminar) {
            return resp.status(404).json({
                ok: false,
                msg: 'No se pudo encontrar la materia'
            })
        }
        const eliminar = await Materias.findByIdAndDelete(id)

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
exports.actualizarMateria = async(req, resp)=>{
    
    const id = req.params.id;
    const materiabd= await Materias.findById(id);
    
    
    try {
        if(!materiabd){
            
            return resp.status(404).json({
                ok:true,
                msg:'No se encontro la materia'
            })
        }
        
        const actualizarUsuario = await Materias.findOneAndUpdate(id, req.body.materia);

        console.log(actualizarUsuario);

        actualizarUsuario.save();
        


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

exports.actualizarAdministradorMateria = async(req,resp=Response)=>{
    const {id} = req.params
    const materiabd= await Materias.findById(id);
    
    
    try {
        if(!materiabd){
            
            return resp.status(404).json({
                ok:true,
                msg:'No se encontro la materia'
            })
        }
        //Agregar Instructor
        if(req.body.administradores){
            console.log('admin agregar');
            const nuevoAdmin = req.body.administradores;
            const actualizarAdmins = await Materias.findByIdAndUpdate({_id:id}, {$push:{"administradores":nuevoAdmin}}, {new:true})
            
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

exports.eliminarInstructor=async(req,resp)=>{
    const {idMateria, idUsuario}=req.params
    try {
        const materiaDb = await Materias.findById(idMateria);
        if(!materiaDb){
            return resp.status(404).json({
                ok:true,
                msg:'No se encontro la materia'
            })
        }
        const eliminarAdmin = await Materias.findByIdAndUpdate({_id:idMateria}, {$pullAll:{administradores:[{_id:idUsuario}]}})

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

exports.getMaterias = async(req, resp=Response)=>{

    try {
        const getMaterias = await Materias.find()
                                  .populate('administradores', 'nombre apellido1 apellido2')
                    
        
        return resp.status(200).json({
            ok:true,
            materias:getMaterias
        })

    } catch (err) {
        return resp.status(500).json({
            ok:false,
            msg:`Hubo un error inesperado: ${err}`
        })
    }


}


exports.getMateria=async(req, resp)=>{
    const id = req.params.id
    
    const materia = await Materias.findById(id)
                                  .populate('administradores', 'nombre apellido1 apellido2 img email')
                                  .populate('inscritos')
    try {
        if(!materia){
            return resp.status(404).json({
                ok:false,
                msg:'No existe esta materia'
            })
        }
        
        return resp.status(200).json({
            ok:true,
            materia
        })
        
    } catch (error) {
        
    }

}

exports.addAlumno=async(req, resp)=>{

const {alumnoId, materiaId} = req.params
    console.log(materiaId, alumnoId);
try {
    const alumnoDb = await Usuarios.findById(alumnoId);

    console.log(alumnoDb);

    if(!alumnoDb || alumnoDb.role==='maestro'){
        return resp.status(500).json({
            ok:false,
            msg:`El rol del usuario no coincide o el usuario no existe`
        })
    }
    
    const agregarInscrito = await Materias.findByIdAndUpdate({_id:materiaId}, {$push:{"inscritos":alumnoId}}, {new:true});
    return resp.status(200).json({
        ok:true,
        msg:'Actualizado',
    }) 

} catch (error) {
    return resp.status(500).json({
        ok:false,
        msg:`Hubo un error inesperado: ${error}`
    })
}




}


exports.eliminarInscrito =async(req, resp)=>{

    const{idMateria, idAlumno}=req.params;

    try {
        
        const alumnoDB = await Usuarios.findById(idAlumno);
        const materiaDB = await Materias.findById(idMateria);
        if(!alumnoDB){
            return resp.status(404).json({
                ok:false,
                msg:'No existe este Usuario'
            })
        }

        const EliminarUsuarioInscrito = await Materias.findByIdAndUpdate({_id:idMateria}, {$pullAll:{inscritos:[{_id:idAlumno}]}})

        return resp.status(200).json({
            ok:true,
            msg:'Eliminacion Exitosa'
        })
    } catch (error) {
        return resp.status(404).json({
            ok:false,
            msg:'Ha ocurrido un error inesperado'+error
        })
    }

}


exports.agregarAsistencia = async(req, resp)=>{

    const {idAlumno, idMateria} = req.params

    const asistencia = req.body

    try {
        const usuarioDb = await Usuarios.findById(idAlumno);
        const materiaDb = await Materias.findById(idMateria);
        if(!usuarioDb){
            return resp.status(400).json({
                ok:false,
                msg:'No existe usuario'
            })
        }
        if(!materiaDb){
            return resp.status(400).json({
                ok:false,
                msg:'No existe materia'
            })
        }

        const agregarAsistencia = await Materias.findByIdAndUpdate(idMateria, {$push:{"inscritos":asistencia}}, {new:true} )



        
    } catch (error) {
        
    }






}

exports.getMateriasMaestro  = async(req, resp)=>{
    const {idMaestro } = req.params

    const maestroDB = await Usuarios.findById(idMaestro);

    if(!maestroDB){
        return resp.status(404).json({
            ok:false,
            msg:'No se encontro el maestro'
        })
    }

    const materiasMaestro = await Materias.find({administradores:idMaestro})

    return resp.status(200).json({
        ok:true,
        materias:materiasMaestro
    })
    
}