
const { model, Schema } = require('mongoose');

const materiasSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    img: {
        type: String
    },
    //Referencia al usuario de tipo maestro que administra la materia
    administradores: [
        { type: Schema.Types.ObjectId, required: true, ref: 'Usuarios' }
    ]
    ,
    //Los horarios de la materia
    horarios: [
        {
            dia:{type:String},
            empiezaHora: {type:Number},
            empiezaMinuto: {type:Number},
            terminaHora: {type:Number},
            terminaMinuto: {type:Number}
        }
    ],
    inscritos: [
        {
                type: Schema.Types.ObjectId,
                ref: 'Usuarios'
        }
    ]

})


module.exports = model('Materias', materiasSchema);