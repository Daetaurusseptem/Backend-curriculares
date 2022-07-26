//pasword LLaRKZ75jAgyJhqR
// user jaime
const {dbConnection} = require('./db/config.js');
require('dotenv').config();
dbConnection();

//subir archivos
const expressFileUpload = require('express-fileupload');
//configuracion del cors
const cors = require('cors')
//inicializacion de la app
const express = require('express');
const app = express();
//lectura y parsing
app.use(express.json());
//configuracion de corsl
app.use(cors());

//file upload
app.use(expressFileUpload());

//rutas
app.use('/api/usuarios', require('./routes/Usuarios'));
app.use('/api/alumnos', require('./routes/Alumnos'));
app.use('/api/materias', require('./routes/Materias'));
app.use('/api/maestros', require('./routes/Maestros'));
app.use('/api/auth', require('./routes/Auth'));
app.use('/api/uploads', require('./routes/Uploads'));
app.use('/api/eventos', require('./routes/Eventos'));
app.use('/api/horarios', require('./routes/Horarios'));
app.use('/api/todo', require('./routes/Busqueda'))


//public directory
app.use(express.static('public'));


app.listen(3000,()=>{console.log('Running on port 3000');});