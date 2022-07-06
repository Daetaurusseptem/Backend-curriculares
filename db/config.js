const mongoose = require('mongoose');


const dbConnection = async()=>{
    try {

        await mongoose.connect(process.env.BD_CNN)
        .then(console.log('DB Online'));
    } catch (error) {
        console.log(error);  
        throw new Error('error al conectarse a la Base de Datos')      ;
    }


}

module.exports = {
            dbConnection,
            
          };