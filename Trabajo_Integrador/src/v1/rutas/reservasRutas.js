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
// autorizarUsuarios([1,2) => Admin y empleado pueden buscar por ID una reserva.
router.get('/:reserva_id', 
    autorizarUsuarios([1]), 
    reservasControlador.buscarPorId
);


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
 *             type: object
 *             properties:
 *               fecha_reserva:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-19"
 *               salon_id:
 *                 type: integer
 *                 example: 1
 *               usuario_id:
 *                 type: integer
 *                 example: 10
 *               turno_id:
 *                 type: integer
 *                 example: 3
 *               foto_cumpleaniero:
 *                 type: string
 *                 example: "foto_cumpleaniero"
 *               tematica:
 *                 type: string
 *                 example: "Portugaltest22"
 *               importe_salon:
 *                 type: number
 *                 example: 95000
 *               servicios:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     servicio_id:
 *                       type: integer
 *                       example: 1
 *                     importe:
 *                       type: number
 *                       example: 5000
 *     responses:
 *       201:
 *         description: Reserva creada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 mensaje:
 *                   type: string
 *                   example: "Reserva creada!"
 *                 salon:
 *                   type: object
 *                   properties:
 *                     reserva_id:
 *                       type: integer
 *                       example: 32
 *                     fecha_reserva:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-10-19T03:00:00.000Z"
 *                     salon_id:
 *                       type: integer
 *                       example: 1
 *                     usuario_id:
 *                       type: integer
 *                       example: 10
 *                     turno_id:
 *                       type: integer
 *                       example: 3
 *                     foto_cumpleaniero:
 *                       type: string
 *                       example: "foto_cumpleaniero"
 *                     tematica:
 *                       type: string
 *                       example: "Portugaltest22"
 *                     importe_salon:
 *                       type: string
 *                       example: "95000.00"
 *                     importe_total:
 *                       type: string
 *                       example: "100000.00"
 *                     activo:
 *                       type: integer
 *                       example: 1
 *                     creado:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-04T17:08:04.000Z"
 *                     modificado:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-04T17:08:04.000Z"
 *       400:
 *         description: Error en los datos enviados.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error interno del servidor.
 */
// autorizarUsuarios([1,3]) => Admin y cliente pueden crear una reserva.
router.post('/', autorizarUsuarios([1, 3]), 

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


/**
 * @swagger
 * /api/v1/reservas/{id}:
 *   put:
 *     summary: Actualizar una reserva existente (Buscar reserva, copiar el json y pasar aqui).
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha_reserva:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-19T03:00:00.000Z"
 *               salon_id:
 *                 type: integer
 *                 example: 1
 *               usuario_id:
 *                 type: integer
 *                 example: 10
 *               turno_id:
 *                 type: integer
 *                 example: 3
 *               foto_cumpleaniero:
 *                 type: string
 *                 example: "foto_cumpleaniero"
 *               tematica:
 *                 type: string
 *                 example: "Portugaltest22"
 *               importe_salon:
 *                 type: string
 *                 example: "95000.00"
 *               importe_total:
 *                 type: string
 *                 example: "100000.00"
 *               activo:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Reserva actualizada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 mensaje:
 *                   type: string
 *                   example: "Reserva actualizada!"
 *                 reserva:
 *                   type: object
 *                   properties:
 *                     reserva_id:
 *                       type: integer
 *                       example: 32
 *                     fecha_reserva:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-10-19T03:00:00.000Z"
 *                     salon_id:
 *                       type: integer
 *                       example: 1
 *                     usuario_id:
 *                       type: integer
 *                       example: 10
 *                     turno_id:
 *                       type: integer
 *                       example: 3
 *                     foto_cumpleaniero:
 *                       type: string
 *                       example: "foto_cumpleaniero"
 *                     tematica:
 *                       type: string
 *                       example: "Portugaltest22"
 *                     importe_salon:
 *                       type: string
 *                       example: "95000.00"
 *                     importe_total:
 *                       type: string
 *                       example: "100000.00"
 *                     activo:
 *                       type: integer
 *                       example: 1
 *                     creado:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-04T17:08:04.000Z"
 *                     modificado:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-04T17:08:04.000Z"
 *       400:
 *         description: Error en los datos enviados.
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Reserva no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
// Ruta para editar las reservas, solo admnin.
router.patch('/:reserva_id', autorizarUsuarios([1]), reservasControlador.editar);


/**
 * @swagger
 * /api/v1/reservas/{reserva_id}:
 *   delete:
 *     summary: Borrado lógico de una reserva
 *     description: Cambia el campo 'activo' de la reserva a 0.
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reserva_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva a eliminar
 *     responses:
 *       200:
 *         description: Reserva eliminada correctamente (borrado lógico)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 mensaje:
 *                   type: string
 *                   example: "Reserva eliminada correctamente (borrado lógico)."
 *                 reserva:
 *                   type: object
 *                   properties:
 *                     reserva_id:
 *                       type: integer
 *                       example: 1
 *                     activo:
 *                       type: boolean
 *                       example: 0
 *                     modificado:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-04T01:50:00Z"
 *       404:
 *         description: Reserva no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: "Reserva no encontrada."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 mensaje:
 *                   type: string
 *                   example: "Error al borrar la reserva."
 */
// Borrado lógico.
router.delete('/:reserva_id', autorizarUsuarios([1]), reservasControlador.borrarReserva);


export { router };