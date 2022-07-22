
const Usuario = require('../models/Usuarios');
const fs = require('fs');
const Materias = require('../models/Materias');
const Eventos = require('../models/Eventos');


const borrarImagen = (path) => {
    if (fs.existsSync(path)) {

        fs.unlinkSync(path);

    }
}

exports.actualizarImagen = async (id, tipo, nombrearchivo) => {

    
    let pathViejo ='';

    switch (tipo) {
        case 'materia':
            const materia  = await Materias.findById(id);
            if ( !materia ) {
                return false;
            }

            pathViejo = `./uploads/img/materias/${materia.img}`

            borrarImagen(pathViejo);

            materia.img = nombrearchivo;

            materia.save()

            return true;
        case 'usuario':
            const usuario = await Usuario.findById(id);

            if (!usuario) {
                return false
            }

            pathViejo = `./uploads/img/usuarios/${usuario.img}`

            borrarImagen(pathViejo);

            usuario.img = nombrearchivo;
            usuario.save()
            return true;

            case 'evento':
            const evento = await Eventos.findById(id);
            if ( !evento ) {
                 console.log('No se encontro evento');
                 return false
            }
            pathViejo = `./uploads/eventos/${evento.img}`
            borrarImagen(pathViejo);
            evento.img = nombrearchivo;
            evento.save()
            return true;
    }



}