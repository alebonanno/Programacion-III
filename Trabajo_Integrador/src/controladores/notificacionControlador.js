import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';
import { readFile } from 'fs/promises';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { error } from 'console';
import dotenv from 'dotenv';

dotenv.config();
// Se escribe asi por que en 'package.json' se especifico trabajar con modulos.
// Obtencion del directorio donde se ejecuta el reservas.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// No es con clases.

export const enviarNotificacion = async (req, res) => {
    try{
        // Desestructuración de los datos del body.
        const {fecha, salon, turno, correoDestino} = req.body;

        if(!req.body.fecha || !req.body.salon || !req.body.turno || !req.body.correoDestino){
            return res.status(400).send({
                ok: false, 
                mensaje:'Faltan datos requeridos.'
            });

        }

        // Se lee el archivo 'plantilla.hbs', que se enviara por correo.
        const plantilla = path.join(__dirname, '..', 'utiles', 'handlebars', 'plantilla.hbs');
        // Para ver la plantilla en consola.
        console.log(plantilla);

        // Lectura de plantilla.
        const datos = await readFile(plantilla, 'utf-8');

        // Compilacion de plantilla.
        const template = Handlebars.compile(datos);
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
                user: process.env.USERCORREO,
                pass: process.env.PASSCORREO,
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

        const info = await transporter.sendMail(opciones);
        return res.status(200).json({
            ok: true,
            mensaje: 'Correo enviado.'
        });
    }catch (error){
        console.log('Error interno en notificación.: ', error);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno al procesar la notificación.'
        });
    }
}