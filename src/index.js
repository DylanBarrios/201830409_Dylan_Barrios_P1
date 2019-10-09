//imports
const path  = require('path');
const express = require('express');
const app = express();

//configuracion del puerto
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.set('port',3000);

//Agregar las rutas
app.get('/',(req,res) => {
    res.render('index');
});


//escucha del puerto
app.listen(app.get('port'), () => {
    console.log('escuchando en el puerto', app.get('port'));
});