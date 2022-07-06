
const {model, Schema} = require('mongoose');
    //Los eventos son parecidos a las materias pero quien los puede establecer son maestros o administradores
const materiasSchema = Schema({
    nombre:{
        type: String,
        required:true,
    },
    descripcion:{
        type: String,
        required:true,
    },
     //Referencia al usuario de tipo maestro que administra l
    realizador:{
        type: Schema.Types.ObjectId,
        required:true,
         ref: 'Usuarios'
        },
    servicioSocial:{
        terminado:Boolean,
        horas:Number
        },
    //Los horarios de la materia
    horario:
        {   
            empieza:{type:Date},
            termina:{type:Date}
        },
    asistira:[
        {
            type: Schema.Types.ObjectId,
            ref:'Usuarios',
            nombre:'String',
            matricula:'String'
        }
    ]

})


module.exports = model('Materias', materiasSchema);