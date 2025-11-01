import express from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';
import autorizarUsuarios from "../../middlewares/autorizarUsuario.js"
import ReservasControlador from '../../controladores/reservasControlador.js';
import passport from 'passport';

const reservasControlador = new ReservasControlador();
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Reservas
 *   description: API para manejar reservas de salones.
 */

// Swagger
/** 
 * @swagger
 * /api/v1/reservas/{reserva_id}:
 *   get:
 *     summary: Buscar una reserva por ID.
 *     tags: [Reservas]
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reserva_id
 *         require: true
 *         schema:
 *           type: string
 *         description: ID de la reserva.
 *
 *     responses:
 *      200:
 *       description: Reserva encontrada.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ok: 
 *                 type: boolean
 *                 example: true
 *               reserva:
 *                 type: object
 *      404:
 *        description: Reserva no encontrada.
*/
// autorizarUsuarios([1,2,3]) => Admin, empleado y cliente pueden buscar por ID una reserva.
router.get('/:reserva_id', autorizarUsuarios([1,2,3]), reservasControlador.buscarPorId);


/**
 * @swagger
 * /api/v1/reservas:
 *   get:
 *     summary: Obtener todas las reservas.
 *     tags: [Reservas]
 *     security: 
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 datos:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/', autorizarUsuarios([1,2,3]), reservasControlador.buscarTodos);

/**
 * @swagger
 * /api/v1/reservas:
 *   post:
 *     summary: Crear una nueva reserva.
 *     tags: [Reservas]
 *     security: 
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              fecha_reserva:
 *                type: string
 *                format: date
 *                example: "2025-11-10"
 *              salon_id:
 *                type: integer
 *                example: 2
 *              usuario_id:
 *                type: integer
 *                example: 5
 *              turno_id:
 *                type: integer
 *                example: 1
 *              servicios:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    nombre:
 *                      type: string
 *                      example: "Decoración"
 *                    importe:
 *                      type: number
 *                      example: 150000
 * 
 *     response:
 *       201:
 *         description: Reserva creada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: booblean
 *                   example: true
 *                 reserva:
 *                   type: object
 *       400: 
 *         description: Error en los datos enviados.
 *       401: 
 *         description: No autorizado.
 */
// autorizarUsuarios([1,3]) => Admin y cliente pueden crear una reserva.
router.post('/', autorizarUsuarios([1,3]), 

    [
        check('fecha_reserva', 'La fecha es necesaria.').notEmpty(),
        check('salon_id', 'El salón es necesario.').notEmpty(),
        check('usuario_id', 'El usuario es necesario.').notEmpty(), 
        check('turno_id', 'El turno es necesario.').notEmpty(),  
        check('servicios', 'Faltan los servicios de la reserva.')
        .notEmpty()
        // Un array, que tenga 1 o mas servicios asociados a la reserva.
        .isArray(),
        check('servicios.*.importe')
        .isFloat() 
        .withMessage('El importe debe ser numérico.'),   
        validarCampos
    ],
    reservasControlador.crear

);

export { router };