import express from 'express';
import { fileURLToPath } from 'url';
import path, {dirname} from 'path';
import dotenv from 'dotenv';


// Importe de rutas.
import { router as v1SalonesRutas } from './v1/rutas/salonesRutas.js'
import { router as v1notificacionRouter } from './v1/rutas/notificacionRuta.js'
// Instancia de express.
const app = express()

// Las solicitudes con un body se interpretan como JSON.
app.use(express.json());

// Que use las rutas que se le pasen.
// '/api' => se pone por convencion.
// '/v1 => es al version 1, tambien debe ponerse en 'bruno' manualmente.
app.use('/api/v1/salones', v1SalonesRutas);
app.use('/api/v1/notificaciones', v1notificacionRouter);



// // Ruta del estado de API, seria como ver si esta activa la aplicación.
// app.get('/estado', (req, res) => {
//     res.json({'ok':true});
//     // Se ejecuta antes la linea '6'.
//     // res.status(201).send({'estado': true, 'mensaje' : 'Reserva creada!'});
// })






// // PUT para editar 1 salon, necesario editar todos los datos.
// // Ruta Express.
// // ":" Indica que es un parámetro dinámico.
// app.put('/salones/:salon_id', async(req, res) => {
    
//     try{
//         // Accede al valor especifico del parámetro llamado 'salon_id' que se define en la ruta Express.
//         // req.params, Siempre es un string, aunque sea un número.
//         const salon_id = req.params.salon_id;
//         // Desestructura el body del request, toma los campos mandados desde bruno, y los guarda es las variables.
//         const {titulo, direccion, latitud, longitud, capacidad, importe, activo} = req.body;


//         // SET: lo que se puede modificar/va a modificarse.
//         const sql = `
//             UPDATE salones
//             SET titulo = ?, direccion = ?, latitud = ?, longitud = ?, capacidad = ?, importe = ?, activo = ?, modificado = NOW()
//             WHERE salon_id = ? AND activo = 1
//         `;

//         // Debe coincidir con SET, en ese orden.
//         // salon_id: coincide con WHERE, no se modifica.
//         const [results] = await conexion.query(sql, [
//             titulo, direccion, latitud, longitud, capacidad, importe, activo, salon_id
//         ]);
//         // Debug para ver affectedRows.
//         console.log(results);

//         // Verificación si esta activo el salón o si se vio afectado auqnue no se modifico nada.
//         // affectedRows === 0 -> Significa que ninguna fila cumplió con el WHERE.
//         // Entonces el salón no existe o esta inactivo.
//         if(results.affectedRows === 0){
//             return res.status(404).json({ok:false, error: 'No se encontro el salón o está inactivo.'});
//         };

//         // Retorno de datos.
//         // res.json({'ok':true, mensaje:'Salón actualizado.'});

//         // Esta version s la misma de arriba(linea 162).
//         res.status(200).json({
//             ok:true,
//             mensaje: 'Salón actualizado.'
//         });

//     }catch (error){
//         console.log(`Error en modificar: ${error}`);
//         res.status(500).json({ok:false, error: 'Error al actualizar.'});
//     };
      
// });


// // DELETE para borrar un salón.
// app.delete('/salones/:salon_id', async(req, res) => {
    
//     try{
//         // Accede al valor especifico del parámetro llamado 'salon_id' que se define en la ruta Express.
//         // req.params, Siempre es un string, aunque sea un número.
//         const salon_id = req.params.salon_id;
//         // Consulta si existe un salón activo con el 'ID'.
//         const sql = `
//             SELECT * FROM salones WHERE activo = 1 and salon_id = ?
//         `;

//         // Ejecuta la consulta anterior(linea 177), reemplaza '?' por elvalor de 'salon_id'.
//         const [results] = await conexion.query(sql, [salon_id]);
//         // Debug para ver resultados del SELECT.
//         console.log(results);

//         // Verifica si, no se encontró ningun salón con ese ID activo.
//         // Ya que, si el array esta vacio, es porque no encontro el salón.
//         if(results.length === 0){
//             return res.status(404).json({
//                 estado: false,
//                 mensaje: 'El salón no existe.'
//             });
//         };

//         // Nueva variable para aplicar la modificación, simulando el DELETE.
//         // Si encuentra el salón y esta activo lo inactiva, hace borrado logico.
//         // sql2 => Se usa esta variable ya que, la variable 'sql' ya esta siendo utilizada.
//         const sql2 = `
//             UPDATE salones
//             SET activo = 0
//             WHERE salon_id = ?
//         `;

//         // Ejecuta la consulta 'UPDATE', inactiva el salón según el 'ID'.
//         // 'results2' contiene información como 'affectedRows', que verifica si se modificaron filas.
//         const [results2] = await conexion.execute(sql2, [salon_id]);

//         // Debug, para ver 'affectedRows'.
//         console.log(results2)

//         // Devuelve un mensaje confirmando la eliminacion(Borrado logico).
//         res.status(200).json({
//             estado: true,
//             mensaje: 'Salón eliminado.'
//         });

//     }catch (error){
//         console.log(`Error en eliminar el salón: ${error}`);
//         res.status(500).json({ok:false, error: 'Error al eliminar.'});
//     };
      
// });



// Lineas 36-141 comentadas.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta al archivo '.env', una carpeta arriba.
dotenv.config({path: path.resolve(__dirname, '../.env')});

// Se guarda en una constante la variable o el puerto en caso de fallar la variable.
const puerto = process.env.PUERTO || 3000;

// Carga de las variables de entorno.
// process.loadEnvFile();
// console.log(process.env.PUERTO);

// Lanzo el server de express.
app.listen(process.env.PUERTO, () => {
    console.log(`Servidor arriba en el puerto ${puerto}`);
});