const Eventos = require("../models/Eventos")
const Materias = require("../models/Materias")
const Usuarios = require("../models/Usuarios")

exports.busquedaCtrller= async(req= request, resp=response)=>{
    try {
        const busquedaQuery = req.params.busqueda.toLowerCase()
        const regEx = new RegExp(busquedaQuery, 'i')

        const [alumnos, maestros, eventos, materias]= await Promise.all([
            Usuarios.find({nombre:regEx, role:'alumno'}),
            Usuarios.find({nombre:regEx, role:'maestro'}),
            Eventos.find({nombre:regEx}),
            Materias.find({nombre:regEx})
        ])


        return resp.status(200).json({
            ok:true,
            busquedaQuery,
            alumnos,
            maestros,
            eventos,
            materias
        })
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok:false,
            msg:"Busqueda invalida"
        })
        
    }

    


}

exports.busquedaDocumentoColeccion = async(req= request, resp=response)=>{
    try {
        
     
        const busquedaQuery = req.params.busqueda;
        const coleccionQuery = req.params.coleccion.toLowerCase();

        const regEx = new RegExp(busquedaQuery, 'i')

        let data = [];

        switch (coleccionQuery) {
            case 'alumnos':
                    data = await Usuarios.find({nombre:regEx, role:'alumno'})
                                       .populate('materia')
                    break;
            case 'maestros':
                    data = await Usuarios.find({nombre:regEx, role:'maestros'})
                    
                    break;
            case 'materias':
                    data = await Materias.find({nombre:regEx})
                                         .populate('administradores')
                                         .populate('inscritos');
                    break;
            case 'eventos':
                    data = await Eventos.find({nombre:regEx})
                                         .populate('realizadores');
                    break;
            
                default:
                    return resp.status(400).json({
                        ok:false,
                        msg:"Coleccion invalida"
                    })
                    
            }
            return resp.status(200).json({
                ok:true,
                busquedaQuery,
                resultados:data
            })
 

    
            
    }catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok:false,
            msg:"Busqueda invalida"+error
        })
        
    }

    


}