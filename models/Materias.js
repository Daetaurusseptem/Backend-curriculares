
const {model, Schema} = require('mongoose');

const materiasSchema = Schema({
    nombre:{
        type: String,
        required:true,
    },
    descripcion:{
        type: String,
        required:true,
    },
    img:{
        type: String
    },
    //Referencia al usuario de tipo maestro que administra la materia
    administradores:[
    {type: Schema.Types.ObjectId,required:true, ref: 'Usuarios'}
    ]
        ,
    servicioSocial:{
        terminado:Boolean,
        horas:Number
        },
    //Los horarios de la materia
    horarios:{
        lunes:{
            activo:{
                type:Boolean
            },
            horarios:{
                empieza:{type:Date},
                termina:{type:Date}
            }
            },
        martes:{
            activo:{
                type:Boolean
            },
            horarios:{
                empieza:{type:Date},
                termina:{type:Date}
            }
            },
        miercoles:{
            activo:{
                type:Boolean
            },
            horarios:{
                empieza:{type:Date},
                termina:{type:Date}
            }
            },
        jueves:{
            activo:{
                type:Boolean
            },
            horarios:{
                empieza:{type:Date},
                termina:{type:Date}
            }
            },
        viernes:{
            activo:{
                type:Boolean
            },
            horarios:{
                empieza:{type:Date},
                termina:{type:Date}
            }
            }

        },
    inscritos:[
        {
            type: Schema.Types.ObjectId,
            ref:'Usuarios',
            asistencias:[
                {
                    asistencia:{
                        fecha:{type: Date},
                        asistencia:{type:Boolean}
                    }
                }
            ]
        }
    ]

})


module.exports = model('Materias', materiasSchema);