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
// Esta sola ruta, maneja CRUD => BREAD.
app.use('/api/v1/salones', v1SalonesRutas);
app.use('/api/v1/notificaciones', v1notificacionRouter);



// // Ruta del estado de API, seria como ver si esta activa la aplicación.
// app.get('/estado', (req, res) => {
//     res.json({'ok':true});
//     // Se ejecuta antes la linea '6'.
//     // res.status(201).send({'estado': true, 'mensaje' : 'Reserva creada!'});
// })


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