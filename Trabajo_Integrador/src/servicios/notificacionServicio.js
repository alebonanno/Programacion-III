import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';
import { readFile } from 'fs/promises';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs'

dotenv.config();

export default class NotificacionServicio {

    enviarNotificacion = async (datosCorreo) => {

        // Se escribe asi por que en 'package.json' se especifico trabajar con modulos.
        // Obtencion del directorio donde se ejecuta el reservas.
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const plantillaPath = path.join(__dirname, '../utiles/handlebars/plantilla.hbs');
        // Se lee el archivo 'plantilla.hbs', que se enviara por correo.
        const plantilla = fs.readFileSync(plantillaPath, 'utf-8');
        // Para ver la plantilla en consola.
        console.log(plantilla);

        // Compilacion de plantilla.
        const template = Handlebars.compile(plantilla);
        const datos = {
            fecha: datosCorreo.fecha,
            salon: datosCorreo.salon,
            turno: datosCorreo.turno
        };
        const correoHTML = template(datos);

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
        // Se da por hecho que es un solo admin.
        const mailopciones = {
            // to: datosCorreo.correoElectronico,
            // cc:
            to: 'emanuelcomas96@gmail.com',
            // Titulo del mensaje.
            subject: 'Notificación',
            // El html ya compilado y con los datos.
            html: correoHTML
        };

        // Mejora de respuesta.
        transporter.sendMail(mailopciones, (error, info) => {
            if (error) {
                console.log('Error al enviar correo.: ', error);
                res.json.status(500)({
                    ok: false,
                    'mensaje': "Error al enviar el correo."
                });
            };
            res.json.status(200)({
                ok: true,
                'mensaje': "Correo enviado."
            });

        });

    };

    // Otros metodos de envio de correo opcionales.
    // enviarWhatsApp = async (datos)  => {}
    // enviarTelegram = async (datos)  => {}
};