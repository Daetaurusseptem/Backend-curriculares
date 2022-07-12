const Materias = require("../models/Materias");
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

exports.getMaestro = async(req,resp)=>{
    const {id} = req.params

    try {
        const maestroDB = await Usuarios.findById(id)
                                       .populate('materia')
        if(!maestroDB){
            return resp.status(404).json({
                ok:false,
                msg:'Hubo un error Inesperado'
            })
        }
        return resp.status(200).json({
            ok:true,
            maestro:maestroDB
        })
        

    } catch (error) {
        return resp.status(500).json({
            ok:false,
            msg:'Hubo un error Inesperado'
        })
    }

}

exports.updateMaestro = async (req, resp)=>{

    const {id} = req.params;

    try {
        const maestroDB = await Usuarios.findById(id)
        if(!maestroDB){
            return resp.status(404).json({
                ok:false,
                msg:'No se ha encontrado el maestro'
            })    
        }
        const maestro = req.body
        console.log(maestro);

        const alumnoActualizado = await Usuarios.findByIdAndUpdate(id, maestro, {new:true})
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

// exports.insertMaestroMateria = async (req, resp)=>{

//     const {idMateria, idMaestro} = req.params

//     const materiaDB = await Materias.findById(idMateria)
//     const maestroDB = await Materias.findById(idMaestro)

//     if(!maestroDB || !materiaDB){
//         return resp.status(404).json({
//             ok:false,
//             msg:'No se ha encontrado el maestro'
//         }) 
//     }

//     const agregarMateria



// }