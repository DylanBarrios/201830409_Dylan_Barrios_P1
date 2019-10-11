
const express = require ('express');                            //Se importan los modulos de node JS
const path = require('path');
const app = express();
app.set('port', 3000);

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views') )

app.use(express.static(path.join(__dirname,'public')));         //Elige la carpeta que sera publica

app.use(require ('./routes/index'));                            //Usa la carpeta routes y se dirige al archivo con todas las rutas

app.use(require ('./routes/analizador'));                       //Se usa el analizador para el archivo que se envie del fontend

app.listen(app.get('port'), ()=>{});                            //Se incia la comunica de node desde el puerto seleccionado
