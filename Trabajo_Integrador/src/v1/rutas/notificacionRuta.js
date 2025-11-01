import express from 'express'
// Módulo que importa la clase encargada de manejar notificaciónes.
import { enviarNotificacion } from '../../controladores/notificacionControlador.js';

// router => Es un objeto que permite definir rutas independientes.
// Luego puede ser montado en la app principal de 'Express'.
const router = express.Router();


// Swagger
/** 
 * @swagger
 * /api/v1/notificaciones:
 *   post:
 *     summary: Enviar una notificación
 *     tags:
 *       - Notificaciones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mensaje:
 *                 type: string
 *                 example: "Hola, esta es una notificación"
 *               destinatario:
 *                 type: string
 *                 example: emanuelcomas96@gmail.com
 *
 *     responses:
 *      200:
 *       description: Notificación enviada correctamente.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado: 
 *                 type: boolean
 *                 example: true
 *               detalle:
 *                 type: string  
 *                 example: "Notificación enviada a emanuelcomas96@gmail.com"
 *      400:
 *        description: Error en los datos envidos.
 *      401:
 *        description: Error interno del servidor.
*/
// Define una ruta 'POST' en la ruta raiz '/' del router
// Cuando se haga un 'POST' a esa ruta, se ejecuta el metódo 'enviarNotificacion' del servicio.
router.post('/', enviarNotificacion);

// Permite que otro archivo lo importe y use para montar las rutas.
export { router };