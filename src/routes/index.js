const express = require('express');
const router = express.Router();
const { nologueado } = require('../lib/auth');

/**Método get que renderiza index.hbs si aún se ha logueado ningun cliente o el administrador */

router.get('/', nologueado, (req, res) =>{
    res.render('links/index.hbs');
});

module.exports = router;