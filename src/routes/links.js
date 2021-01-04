const express = require('express');
const router = express.Router();
const app = express();
const pool = require('../database')
const { logueado } = require('../lib/auth');
const { isAdmin } = require('../lib/adminauth');



//-------------------------------------------------------------------------------------------------

/**Método get y post para visualizar y esocger los platos
 * 
 */

router.get('/platos', logueado, async (req, res) => {
    const menu = await pool.query('SELECT * FROM menu');
    const checkeo2pedidos = await pool.query('SELECT Estado FROM pedidos WHERE user_id = ?', [req.user.ID]);

    res.render('links/platos', { menu, checkeo2pedidos });
});

router.post('/platos', logueado, async (req, res) => {
    const { ID, NombrePlato, Codigo, Precio, username, user_id, Img } = req.body;
    const nuevoCarrito = {
        ID,
        NombrePlato,
        Codigo,
        Precio,
        username,
        user_id,
        Img
    }
    console.log(nuevoCarrito)
    try {
        let resultado = await pool.query('INSERT INTO carrito set ?', [nuevoCarrito]);
        req.flash('success', 'Agregado al carrito');
        console.log(resultado);
        res.redirect('/links/platos')
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


//------------------------------------------------------------------------------------------------
/**Método get y post para confirmar y/o eliminar las compras realizadas
 * 
 */


router.get('/confirmar', logueado, async (req, res) => {
    const carrito = await pool.query('SELECT * FROM carrito WHERE user_id = ?', [req.user.ID]);
    res.render('links/confirmar', { carrito });
});

router.post('/removeitem', logueado, async (req, res) => {
    try {
        await pool.query('DELETE FROM carrito WHERE ID = ? AND user_id = ?', [req.body.ID, req.user.ID]);
        res.redirect('/links/confirmar')
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    };
});

router.post('/confirmar', logueado, async (req, res) => {
    const { Estado, Descripcion, DescripcionCompleta, TipoPago, Pago, Usuario, Direccion } = req.body;
    const nuevoPedido = {
        Estado,
        Descripcion,
        DescripcionCompleta,
        TipoPago,
        Pago,
        Usuario,
        Direccion,
        user_id: req.user.ID,
    }
    console.log(nuevoPedido)
    try {
        await pool.query('INSERT INTO pedidos set ?', [nuevoPedido]);
        req.flash('success', 'Pedido confirmado');
        await pool.query('DELETE FROM carrito WHERE user_id = ?', [req.user.ID]);
        res.redirect('/links/recibido')
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    };
});


router.post('/borrarcarrito', logueado, async (req, res) => {
    try {
        await pool.query("DELETE FROM carrito WHERE user_id = ?", [req.user.ID]);
        res.redirect('/links/platos')
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    };
});



//-------------------------------------------------------------------------------------------------
/**Método get que confirma que se ha recibido el pedido realizado */


router.get('/recibido', logueado, async (req, res) => {
    res.render('links/recibido');
});


//-------------------------------------------------------------------------------------------------
/** Método get y post para ver el estado del pedido
 * 
 */


router.get('/seguimiento', logueado, async (req, res) => {
    const pedidos = await pool.query('SELECT * FROM pedidos WHERE user_id = ?', [req.user.ID]);
    res.render('links/seguimiento', { pedidos });
});

router.post('/seguir', logueado, async (req, res) => {
    try {
        await pool.query('DELETE FROM pedidos WHERE Estado = "NUEVO" AND user_id = ?', [req.user.ID]);
        await pool.query('UPDATE pedidos SET Estado = "CANCELADO" WHERE user_id = ?', [req.user.ID]);
        res.redirect('/profile')
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    };
});

router.post('/recibido', logueado, async (req, res) => {
    const { UserID } = req.body;
    const user = {
        UserID
    }
    console.log(user)
    try {
        const peticion = await pool.query('UPDATE pedidos SET Estado = "ENTREGADO" WHERE user_id = ?', [req.user.ID]);
        console.log(peticion);
        res.redirect('/profile')
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    };
});

module.exports = router;


//-------------------------------------------------------------------------------------------------
/** Método get y post para visualizar los pedidos (consultados en la base de datos) desde la vista 
 * del administrador
 * 
 */

router.get('/admin', logueado, isAdmin, async (req, res) => {
    const pedidos = await pool.query('SELECT * FROM pedidos');
    res.render('links/menuadmin', { pedidos });
    console.log("solicitando acceso a admin")
});

router.post('/admin', logueado, isAdmin, async (req, res) => {
    const { Estado, user_id } = req.body;
    const data = {
        Estado,
        user_id
    }
    try {
        const ver = await pool.query("UPDATE pedidos SET Estado = ? WHERE user_id = ?", [data.Estado, data.user_id]);
        console.log(ver);
        res.redirect('/links/admin')
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    };
});

//-------------------------------------------------------------------------------------------------
/** Método get y post que renderiza el menú y envia peticiones por cada item del menú
 * 
 */

router.get('/menu', logueado, isAdmin, async (req, res) => {
    try {
        const menu = await pool.query('SELECT * FROM menu');
        res.render('links/menu', { menu });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    };
});

router.post('/borrarmenu', logueado, isAdmin, async (req, res) => {
    try {
        await pool.query("DELETE FROM menu WHERE ID = ?", [req.body.ID]);
        res.redirect('/links/menu')
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    };
});



//-------------------------------------------------------------------------------------------------
/**Método get y post que renderiza el listado de usuarios, además que permite eliminar usuarios
 * desde la vista del administrador
 * 
 */

router.get('/usuarios', logueado, isAdmin, async (req, res) => {
    try {
        const listausuarios = await pool.query('SELECT * FROM usuarios');
        res.render('links/usuarios', { listausuarios });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    };
});

router.post('/borrarusuario', logueado, isAdmin, async (req, res) => {
    const { ID } = req.body;
    const data = {
        ID
    }
    try {
        await pool.query("DELETE FROM usuarios WHERE ?", [data]);
        res.redirect('/links/usuarios')
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    };
});

//-------------------------------------------------------------------------------------------------
/**Méotodos get y post relacionados al historial de pedidos 
 * 
 */

router.get('/historial', logueado, isAdmin, async (req, res) => {
    const pedidos = await pool.query('SELECT * FROM historial');
    res.render('links/historial', { pedidos });
});


router.post('/historial', logueado, isAdmin, async (req, res) => {
    const { Estado, Hora, Numero, Descripcion, DescripcionCompleta, TipoPago, Pago, Usuario, user_id, Direccion } = req.body;
    const data = {
        Estado,
        Hora,
        Numero,
        Descripcion,
        DescripcionCompleta,
        TipoPago,
        Pago,
        Usuario,
        user_id,
        Direccion
    }
    try {
        await pool.query("INSERT INTO historial SET ?", [data]);
        await pool.query("DELETE FROM pedidos WHERE Numero = ?", [data.Numero]);
        res.redirect('/links/admin')
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    };
});

router.post('/undohistorial', logueado, isAdmin, async (req, res) => {
    const { Estado, Numero, Descripcion, DescripcionCompleta, TipoPago, Pago, Usuario, user_id, Direccion } = req.body;
    const data = {
        Estado,
        Numero,
        Descripcion,
        DescripcionCompleta,
        TipoPago,
        Pago,
        Usuario,
        user_id,
        Direccion
    }
    try {
        await pool.query("INSERT INTO pedidos SET ?", [data]);
        await pool.query("DELETE FROM historial WHERE Numero = ?", [data.Numero]);
        res.redirect('/links/historial')
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    };
});


router.post('/borrarhistorial', logueado, isAdmin, async (req, res) => {
    try {
        await pool.query("DELETE FROM historial");
        res.redirect('/links/historial')
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    };
});




//-------------------------------------------------------------------------------------------------
/**Método get y post para poder agregar platos
 * 
 */

router.get('/add', logueado, isAdmin, (req, res) => {
    res.render('links/add');
});

router.post('/add', logueado, async (req, res) => {
    const { NombrePlato, Codigo, Precio, Gluten, Img} = req.body;
    const nuevoPlato = {
        Codigo,
        NombrePlato,
        Precio,
        Gluten,
        Img
    }
    console.log(nuevoPlato)
    try {
        let resultado = await pool.query('INSERT INTO menu set ?', [nuevoPlato]);
        console.log(resultado);
        res.redirect('/links/menu')
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});



//-------------------------------------------------------------------------------------------------
/**Método para poder editar y modificar los pedidos realizados
 * 
 */



router.get('/editar/:ID', logueado, isAdmin, async (req, res) => {
    const { ID } = req.params;
    const plato = await pool.query('SELECT * FROM menu WHERE ID = ?', [ID]);
    res.render('links/modificar', {plato: plato[0]});
});



router.post('/modify/:ID', logueado, isAdmin, async (req, res) => {
    const { ID } = req.params;
    const { Codigo, NombrePlato, Precio, Gluten, Img } = req.body;
    const PlatoMod = {
        Codigo,
        NombrePlato,
        Precio,
        Gluten,
        Img
    }
    console.log(PlatoMod);
    try {
        await pool.query('UPDATE menu set ? WHERE ID = ?', [PlatoMod, ID]);
        res.redirect('/links/menu')
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;








