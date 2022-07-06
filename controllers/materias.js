const Materias= require("../models/Materias");
const Usuarios = require("../models/Usuarios");

exports.crearMateria = async (req, resp)=>{
    try {
        const admin = req.body.administradores;
        const nuevaMateria = await Materias.create(req.body)
                                   
        resp.status(200).json({
            ok:true,
            msg:"Todos correcto"}
        )
    } catch (error) {
        console.log(`error: ${error}`);
        
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

exports.actualizarMateria = async(req,resp=Response)=>{
    console.log('entro');
    const id = req.params.id;
    const materiabd= await Materias.findById(id);
    
    
    try {
        if(!materiabd){
            console.log('2');
            return resp.status(404).json({
                ok:true,
                msg:'No se encontro la materia'
            })
        }

        if(req.body.administradores){
            const nuevoAdmin = req.body.administradores;
            const actualizarAdmins = await Materias.findByIdAndUpdate({_id:id}, {$push:{"administradores":nuevoAdmin}}, {new:true})
            console.log(nuevoAdmin);
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

exports.getMaterias = async(req, resp=Response)=>{

    try {
        const getMaterias = await Materias.find()
                                  .populate('administradores', 'nombre apellido1 apellido2')
                                  
        console.log(getMaterias);
        
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