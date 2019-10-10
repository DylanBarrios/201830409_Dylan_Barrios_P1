const express = require('express');
const router = express.Router();
router.use(express.json());
const path = require('path');

//utilizaremos router para las rutas ya no app
router.get('/', (req, res) => {
    res.render('agregar', { max: 15 });
});

module.exports = router;