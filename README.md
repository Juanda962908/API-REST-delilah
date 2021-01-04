# Tercer Proyecto de Acamica para el curso de desarrollo web full stack
# Nombre del poryecto: Delilah Restó
# Autor: Juan Daniel de la Hoz Fonseca

# -------------------------------------------------------------------
# INTRODUCIÓN DEL PROYECTO:
Delilah restó es una api rest que tiene como objetivo modelar una tienda de comidas, en donde los clientes a través de rutas
http puedan escoger, actualizar, aprobar, decidir el método de pago, cancelar pedidos, ver el estado de sus pedidos etc.
Así también el administrador de la aplicación puede a través de protocolos http listar los productos,los clientes, actualizar el estado de los pedidos, borrar usuarios etc.
de cada cliente.

# HERRAMIENTAS UTILIZADAS:
Para desarrollar esta api rest fue necesario utilizar:
-JavaScript
-MySql
-Nodejs (Módulos definidos a continuación)
-Handlebars
-CSS


# MÓDULOS DE NODE UTILIZADOS PARA LA CONSTRUCCIÓN DE LA API REST:
Algunos de los módulos utilizados para la construcción de esta api rest son los siguientes.
 *  1. express: este módulo permite la construcción y ejecución del  servidor
 *  2. morgan: permite ver las peticiones http en consola 
 *  3. express-handlebars : es un motor de plantilla html
 *  4. path:  permite generar enlaces de rutas del proyecto
 *  5. express-session: módulo que permite generar sessions en el servidor de express
 *  6. passport: módulo para autenticar y manejar el proceso de login 
 *  7. connect-flash: módulo que permite enviar mensajes entre multiples vistas
 *  8. express-mysql-session: módulo que sirve para guardar las sessiones de mysql 
 *  9. bcrypt: módulo que permite codificar contraseñas

# -------------------------------------------------------------------

# INSTRUCCIÓN PARA USAR LA API REST


1. Clonar el proyecto de Git con  git clone https://github.com/Juanda962908/API_rest.git .
2. Instalar Y ejecutar XAMPP para iniciar el servidor de base de datos MySQL y Apache (en la interfaz de xampp indica los puertos 
de la base de datos y de apache)
3. Ingresar a http://localhost/phpmyadmin/, crear una base de datos llamada delilah
4. Dentro de la base de datos delilah importar el archivo "delilah.sql" que se encuentra en la carpeta db_delilah del proyecto   
5. Abrir una termminal y direccionarse en la ruta del proyecto (se puede utilizar la terminal de Visual Studio Code)
6. Iniciar el servidor con el comando 'npm run dev'

Si se ejecuta el servidor correctamente se debe mostrar un mensaje de la siguiente manera.

```
$ npm run dev

> delilahtp@1.0.0 dev C:\Users\Juanda\Documents\Acamica\TercerProyecto_Delilah_Juan_De_La_hoz
> nodemon src/

[nodemon] 2.0.6
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node src/`
{ host: 'localhost', port: '3306', user: 'root', database: 'delilah' }
Server on port 3000
Conectado a la base de datos
GET / 200 21.329 ms - 1741
GET /CSS/style.css 200 16.255 ms - 622
GET /CSS/index.css 200 7.994 ms - 4829
GET /CSS/registro.css 200 3.404 ms - 3867
GET /CSS/menu.css 200 5.656 ms - 6409
GET /CSS/admin.css 200 4.140 ms - 6855
GET /CSS/historial.css 200 1.697 ms - 1822
GET /CSS/confirmar.css 200 1.340 ms - 2736
GET /CSS/recibido.css 200 1.458 ms - 1044
GET /CSS/seguir.css 200 1.937 ms - 5264
GET /assets/background.jpg 200 0.960 ms - 952773
GET /favicon.ico 404 2.604 ms - 150


```

7. Iniciar la aplicación desde la URL **http://localhost:3000/**

# -------------------------------------------------------------------

# CONFIGURACIÓN DE LA BASE DE DATOS
Para configurar el acceso a la base de datos, abrir el archivo keys.js dentro de /src y verificar:

```
host: 'localhost'
port: 3306
user: root
database: delilah
```

# -------------------------------------------------------------------
# RUTAS PARA USUARIOS NO ADMINISTRADOR

A continuación se detallan las rutas que tiene la API para usuarios de tipo no administradores




* / : Ruta de vista de inicio para ingresar o crear usuario 
* /signup :  Ruta para crear usuario
* /signin : Ruta para el ingreso de usuarios ya registrados
* /profile : Ruta donde se visualiza el perfil de usuario
* /links/platos : Ruta para ver el listado de platos a elegir
* /links/confirmar : Ruta para ver los productos en el carrito de compras
* /links/recibido : Ruta de confirmación de compra
* /links/seguimiento : Ruta para tener el seguimiento de compra




# -------------------------------------------------------------------
# RUTAS PARA USUARIOS TIPO ADMINISTRADOR
A continuación se detallan las rutas que tiene la API para usuarios tipo administrador



acceso único para admin:
* /signupadmin : Ruta para el registro de usuarios con privilegios admin
* /links/admin : Ruta para ver los pedidos en curso
* /links/historial : Ruta para ver el historial de pedidos
* /links/usuarios : Ruta para listar usuarios
* /links/menu : Ruta para ver lista de platos
* /links/add : Ruta para agregar un plato
* /links/modificar : Ruta para modificar un plato

# -------------------------------------------------------------------
# MATERIAL DE APOYO PARA LA CONSTRUCCIÓN DE LA API REST DELILAH RESTÓ

* https://code.tutsplus.com/es/tutorials/code-your-first-api-with-nodejs-and-express-connect-a-database--cms-31699
* https://www.youtube.com/watch?v=qJ5R9WTW0_E



