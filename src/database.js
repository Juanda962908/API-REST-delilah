// En este archivo se genera la conexión a la base de datos con createPool,
 

/**Se requiere:
 * 1. mysql para poder realizar la conexión 
 * 2. promisify haciendo destructuring para convertir los callbacks en promesas
 * 3. el archivo ./keys debido a que en el se encuentra definida la configuración de la base de datos 
 * 
 * se utiliza createPool para poder generar la conexión con la base de datos
 */
const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');
const pool = mysql.createPool(database);


//-------------------------------------------------------------------------------------------------
/** Arrow function que imprime por consola mensajes de error 
 * de acuerdo a cada código de error, o un mensaje exitoso si el estado es correcto
 *  
 * 
 */

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error ('LA CONEXION CON LA BASE DE DATOS FUE CERRADA');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('LA BASE DE DATOS TIENE DEMASIADAS CONEXIONES');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('LA CONEXION A LA BASE DE DATOS FUE RECHAZADA');
        }
    } else {
        console.log('Conectado a la base de datos');
        return;
    }});

pool.query = promisify(pool.query)

module.exports = pool; 