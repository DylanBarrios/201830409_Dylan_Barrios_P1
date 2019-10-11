const express = require('express');                                     //Se importan los modulos necesarios para crear las rutas
const router = express.Router();
router.use(express.json());
const path = require('path');

router.get('/', (req, res) => {
    res.render('./leer.ejs', { max: 15 });                             //Se agrega el fichero raiz que sera el que cargue y lea los archivos
});

router.get('/inicio', (req, res) => {                                  //Al presionar inicio llama de nuevo al archivo que lee archivos
    res.render('./leer.ejs', { max: 15 });
    
});

router.get('/Perfil', (req, res) => {                                   //Muestra mis datos
    res.render('./Perfil.ejs', { max: 15 });
    
});

router.get('/diagramas', (req, res) => {                                //Muestra mis datos
    res.render('./diagramas.ejs', { max: 15 });
    
});

module.exports = router;