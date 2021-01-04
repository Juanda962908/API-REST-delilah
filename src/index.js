/** se requieres los siguientes módulos para poder definir el servidor:
 *  1. express: este módulo permite ejecutar el servidor
 *  2. morgan: permite ver las peticiones http en consola 
 *  3. express-handlebars : es un motor de plantilla html
 *  4. path:  permite generar enlaces de rutas
 *  5. express-session: módulo que permite generar sessions en el servidor de express
 *  6. passport: módulo para autenticar y manejar el proceso de login 
 *  7. connect-flash: módulo que permite enviar mensajes entre multiples vistas
 *  8. express-mysql-session: módulo que sirve para guardar las sessiones de mysql 
 * 
 * NOTA: Para ejecutar el servidor se escribe el comando npm run dev
 */


const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const MySqlStore = require('express-mysql-session');

const { database } = require('./keys');
console.log(database);

//-------------------------------------------------------------------------------------------------
/**Se inicializa el servidor de express con express() y se guarda en la variable app
 * 
 */
const app = express();
require('./lib/passport');

//-------------------------------------------------------------------------------------------------
/**1. Se definie puerto por donde se va a escuchar el serividor, si el sistema
 * aoperativo tiene un puerto por defecto, se le define con process.env.port, de lo contrario tomar el puerto 4000
 * 
 * 2. Configuramos el motor de handlebars, se utiliza el módulo path para indicar que en la carpeta views 
 * hay un archivo main (con la extensión .hbs) que va a ser el layout por defecto. las demás vistas estarán en 
 * layouts y otras vistas parciales estarán en partials 
 * 
 * 3. se inicializa el motor de handlebars con app.set
 */

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', 
}));

app.set('view engine', '.hbs');

//-------------------------------------------------------------------------------------------------

/**Se definen los middleware (los middlewares son función que se ejecutan cuando el cliente ejecuta una petición http)
 * 
 * 1.app.use(session) :  middleware que configura las sessiones
 * 2.app.use(flash()) : permite enviar mensajes entre diferentes vistas
 * 3.app.morgan('dev') : permite ver el estado y las peticiones que realiza un cliente
 * 4.app.urlencoded() : permite tomar los datos de formularios, se define el extended como false para indicar 
 * que solo se quieren tomar datos sencillos como palabras, numeros etc... (no imágenes)
 * 5. app.use(express.json () ):  convierte en json las peticiones https
 * 6. app.use(passport.initialize()) : se inicia el módulo que se encarga de manejar el proceso de login 
 * y autenticación.
 */

app.use(session({
    secret: 'delilahnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MySqlStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//-------------------------------------------------------------------------------------------------
/** Definición de variables globales
 * 
 */

app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
})

//-------------------------------------------------------------------------------------------------

/**Se definen inicialmente las rutas que serán usadas en la api
 * 
 */
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));




















//public
app.use(express.static(path.join(__dirname, 'public')));

//starting the server

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})
