const {model, Schema} = require('mongoose');

const usuarioSchema = Schema({
    nombre:{
        type: String,
        required:true,
    },
    apellido1:{
        type:String,
        required:true
    },
    apellido2:{
        type:String
    },
    email:{
        type: String,
        unique:true,
        required:true,
    },
    password:{
        type: String,
        required:true
    },
    img:{
        type: String
    },
    cuatrimestre:{
        type:Number        
    },
    carrera:{
        type:String
    },
    //
    matricula:{
        type:String,
        required:false,
        index: {
            unique: true,
            partialFilterExpression: {matricula: {$type: "string"}}
        }
    },
    materia:{
        type: Schema.Types.ObjectId, ref: 'Materias', default:null
    },
    servicioSocial:{
        status:{
            type:Boolean,
            default:false
        },
        horas:{
            type:Number
        }
    },
    role:{
        type: String,
        required:true,
        default:'alumno'
    },
    google:{
        type:Boolean,
        default:false
    },
    asistencias:[
        {
            fecha:{type:Date},
            asistio:{type:Boolean}
        }
    ]

})



usuarioSchema.method('toJson', function(){
    const{__v, _id, password, ...object} = this.toObject();

    object.uid = _id;
    

    return object;

});

module.exports = model('Usuarios', usuarioSchema);