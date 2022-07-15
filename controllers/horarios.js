const Materias = require("../models/Materias")


exports.agregarHorario=async(req,resp)=>{
    const idMateria=req.params.id
try {
    const materiaDb = await Materias.findById(idMateria)
    if(!materiaDb){
        return resp.status(500).json({
            ok:false,
            msg:'No se encontro materia'
        })
        
    }
     const materiaUpdate= await Materias.findOneAndUpdate({_id:idMateria},{$push:{horarios:req.body}})

        return resp.status(200).json({
            ok:true,
            msg:'Agregado'
        })

} catch (error) {
    
    return resp.status(200).json({
        ok:true,
        msg:'Hubo un error'
    })
}
    
    

}

 exports.getHorarioMateria=async(req,resp)=>{
     const {id}=req.params
     try {
         const materiaDB = await Materias.findById(id)

         if(!materiaDB){
            resp.status(404).json({
                ok:true,
                msg:'No se encontro usuario'
             })
    
         }

         const materias = await Materias.find({_id:id})

         resp.status(200).json({
            ok:true,
            materias
         })

     } catch (error) {
        resp.status(200).json({
            ok:false,
            msg:'Hubo un error inesperado'
         })

     }
 }