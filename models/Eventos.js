
const {model, Schema} = require('mongoose');
    //Los eventos son parecidos a las materias pero quien los puede establecer son maestros o administradores
const eventosSchema = Schema({
    img:{
        type:String
    },
    nombre:{
        type: String,
        required:true,
    },
    descripcion:{
        type: String,
        required:true,
    },
     //Referencia al usuario de tipo maestro que administra l
    realizadores:[{type: Schema.Types.ObjectId,ref: 'Usuarios'}],
    //Los horarios de la materia
    horario:
        {   
           
            empieza:{type:Date, required:true},
            termina:{type:Date, required:true}
        },
    asistira:[
        {
            type: Schema.Types.ObjectId,
            ref:'Usuarios'
        }
    ]

})


module.exports = model('Eventos', eventosSchema);