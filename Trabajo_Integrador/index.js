import express from 'express'
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import path from 'path';
import {conexion} from './db/conexion.js';

// Instancia de express.
const app = express()

// Las solicitudes con un body se interpretan como JSON.
app.use(express.json());

// Ruta del estado de API, seria como ver si esta activa la aplicación.
app.get('/estado', (req, res) => {
    res.json({'ok':true});
    // Se ejecuta antes la linea '6'.
    // res.status(201).send({'estado': true, 'mensaje' : 'Reserva creada!'});
})

// Ruta tipo POST, por ahora recibe datos, se complementa con envio de un correo electrónico.
app.post('/notificacion', async (req, res) => {
    console.log(req.body);

    if(!req.body.fecha || !req.body.salon || !req.body.turno || !req.body.correoDestino){
        res.status(400).send({'estado':false, 'mensaje':'Faltan datos requeridos.'});
    }

    try{

        // Desestructuración de los datos del body.
        const {fecha, salon, turno, correoDestino} = req.body;
        
        // Se escribe asi por que en 'package.json' se especifico trabajar con modulos.
        // Obtencion del directorio donde se ejecuta el index.
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        // Se lee el archivo 'plantilla.hbs', que se enviara por correo.
        const plantilla = path.join(__dirname, 'utiles', 'handlebars', 'plantilla.hbs');
        // console.log(plantilla);

        // Lectura de plantilla.
        const datos = await readFile(plantilla, 'utf-8');

        // Compilacion de plantilla.
        const template = handlebars.compile(datos);
        // Pasado de datos a la plantilla.
        var html = template(
            {fecha: fecha, 
            salon: salon, 
            turno: turno}
        );

        console.log(html)


        // Transportador, es el encargado para el envio de correo electronico.
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                // Usa las credenciales del archivo '.env'.
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });
        
        // Establecimiento de opciones para el correo, ejemplo: destinatario y cuerpo del correo.
        const opciones = {
            to: correoDestino,
            // Titulo del mensaje.
            subject: 'Notificación',
            // El html ya compilado y con los datos.
            html: html
        }

        transporter.sendMail(opciones, (error, info) => {
            if (error){
                // Se le avisa al cliente que hubo un error.
                res.json({'ok':false, 'mensaje': 'Error al enviar el correo.'});
            };
            console.log(info);
            res.json({'ok': true, 'mensaje':'Correo enviado.'});
        });

    }catch (error){
        console.log(error);
    }

    res.json({'ok':true});
})


// Obtención de todos los salones de la db.
app.get('/salones', async(req, res) => {
    try{
        const sql = 'SELECT * FROM salones WHERE activo = 1';
        const [results, fields] = await conexion.query(sql);

        console.log(results);
        console.log(fields);

        res.json({'ok': true, 'salones':results});
    }catch (error){
        console.log(error)
    }
});


// GET para obtener 1 salón.
app.get('/salones/:salon_id', async(req, res) => {
    try{
        const salon_id = req.params.salon_id;
        const sql = `SELECT * FROM salones WHERE salon_id = ${salon_id} AND activo = 1`;

        const [results, fields] = await conexion.query(sql);

        // Retorno de datos.
        res.json({'ok':true, 'salones':results});
    }catch (error){
        console.log(error);
    }
});

// PUT para editar 1 salon, necesario editar todos los datos.
// Ruta Express.
// ":" Indica que es un parámetro dinámico.
app.put('/salones/:salon_id', async(req, res) => {
    
    try{
        // Accede al valor especifico del parámetro llamado 'salon_id' que se define en la ruta Express.
        // req.params, Siempre es un string, aunque sea un número.
        const salon_id = req.params.salon_id;
        // Desestructura el body del request, toma los campos mandados desde bruno, y los guarda es las variables.
        const {titulo, direccion, latitud, longitud, capacidad, importe, activo} = req.body;


        // SET: lo que se puede modificar/va a modificarse.
        const sql = `
            UPDATE salones
            SET titulo = ?, direccion = ?, latitud = ?, longitud = ?, capacidad = ?, importe = ?, activo = ?, modificado = NOW()
            WHERE salon_id = ? AND activo = 1
        `;

        // Debe coincidir con SET, en ese orden.
        // salon_id: coincide con WHERE, no se modifica.
        const [results] = await conexion.query(sql, [
            titulo, direccion, latitud, longitud, capacidad, importe, activo, salon_id
        ]);

        // Verificación si esta activo el salón.
        if(results.affectedRows === 0){
            return res.status(404).json({ok:false, error: 'No se encontro el salón o está inactivo.'});
        };

        // Retorno de datos.
        res.json({'ok':true, mensaje:'Salón actualizado.'});

    }catch (error){
        console.log(`Error en modificar: ${error}`);
        res.status(500).json({ok:false, error: 'Error al actualizar.'});
    };
      
});


// Carga de las variables de entorno.
process.loadEnvFile();
console.log(process.env.PUERTO);

// Lanzo el server de express.
app.listen(process.env.PUERTO, () => {
    console.log(`Servidor arriba en ${process.env.PUERTO}`);
});