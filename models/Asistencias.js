
const {model, Schema} = require('mongoose');
//Los eventos son parecidos a las materias pero quien los puede establecer son maestros o administradores
const asistenciaSchema = Schema({

alumno:{type: Schema.Types.ObjectId,ref: 'Usuarios'},
//Los horarios de la materia
asistencias:[
    {
        fecha:{type:Date, unique:true},
        asistio:{type:Boolean}
    }
]

})
