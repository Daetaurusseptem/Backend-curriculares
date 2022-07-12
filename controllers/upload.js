const { v4:uuid  } = require ('uuid');

const { validateMongoID } = require("../helpers/is-mongo-id");
const { actualizarImagen } = require("../helpers/actualizar-image");


const fs = require('fs');
const path = require('path');
const { response } = require('express');


exports.fileUpload = async(req=request, resp=response)=>{

    const {id, tipo} = req.params;

    if(!validateMongoID(id)){
        return resp.status(400).json({
            ok:false,
            msg:'ID INVALIDO'
        })
    }
    
    const tiposValidos = ['usuario', 'materia', 'evento'];
    
    if(!tiposValidos.includes(tipo)){
        return resp.status(400).json({
            ok:false,
            msg:'No es: usario, materia o evento'
        })
    }
 


      if (!req.files || Object.keys(req.files).length === 0) {
        return resp.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

     //Procesar imagen

     const file = req.files.imagen;
     const nombreCortado = file.name.split('.');
     const extensionArchivo = nombreCortado[nombreCortado.length - 1];

     const permittedExtensions  = ['jpg','jpeg','png','gif'];

     if(!permittedExtensions.includes(extensionArchivo)){
        return resp.status(400).json({
            ok: false,
            msg: 'El formato de la imagen no es valido'
        });
     }
     //img name assignment
     const nombreArchivo = `${uuid()}.${extensionArchivo}`;

     //img path
     const path = `./uploads/img/${tipo}/${nombreArchivo}`;

     file.name = nombreArchivo;
     file.mv(path, (err)=>{
         if(err){
             console.log(err);
            return resp.status(500).json({
                ok: false,
                msg: 'Ocurrio un error inesperado'
            });
         }
     })

     actualizarImagen(id, tipo, nombreArchivo);

    
    return resp.status(200).json({
        ok:true,
        id,
        tipo,
        nombreArchivo
    })

}

exports.getImagen = (req, resp=response) =>{

    const {imagen, tipo} = req.params
    
    
    
    const pathImg = path.join(__dirname,`../uploads/img/${tipo}/${imagen}`)

    //img por defecto
    if(fs.existsSync(pathImg)) {
        resp.sendFile(pathImg)
    }else{
        const noImg = path.join(__dirname, `../uploads/img/no_image.png`)
        resp.sendFile(noImg)
    }
}
