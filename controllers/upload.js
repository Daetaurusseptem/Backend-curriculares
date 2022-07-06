const { v4:uuid  } = require ('uuid');

const fs = require('fs');
const path = require('path');


exports.fileUpload = async(req=request, resp=response)=>{

    const {id, tipo} = req.params;

    
    const tiposValidos = ['usuarios', 'materias'];
    
    if(!tiposValidos.includes(tipo)){
        return resp.status(400).json({
            ok:false,
            msg:'No es: medicos, hospitales o usuarios'
        })
    }
}
