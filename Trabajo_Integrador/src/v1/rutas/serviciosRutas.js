import express from 'express';
import ServiciosControlador from '../../controladores/serviciosControlador.js'
import { validarCampos } from '../../middlewares/validarCampos.js';
import { cache } from '../../middlewares/apicache.js'
import { check } from 'express-validator';
import autorizarUsuario from "../../middlewares/autorizarUsuario.js"
import passport from 'passport';

// Instancia del controlador.
const serviciosControlador = new ServiciosControlador();
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Servicios
 *   description: Endpoints para gestionar los servicios.
*/




/**
 * @swagger
 * /api/v1/servicios:
 *   get: 
 *     summary: Obtener todos los servicios.
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: 
 *         description: Lista de servicios.
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
 *                     properties:
 *                       servicio_id:
 *                         type: integer
 *                         example: 1
 *                       description:
 *                         type: string
 *                         example: "Servicio de catering"
 *                       importe:
 *                         type: number
 *                         example: 1500
 *       401:
 *         description: No autorizado o token inválido.
 *       500:
 *         description: Error interno del servidor.
*/
// CRUD.
// Obtener todos los servicios.
router.get('/', 
    cache('5 minutos'),
    passport.authenticate('jwt', { session: false }),
    autorizarUsuario([1,2,3]),
    serviciosControlador.obtenerTodos
);


/** 
 * @swagger
 * /api/v1/servicios/{servicio_id}:
 *   get:
 *     summary: Buscar un servicio por ID.
 *     tags: [Servicios]
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: servicio_id
 *         require: true
 *         schema:
 *           type: integer
 *         description: ID del servicio.
 *
 *     responses:
 *      200:
 *       description: Servicio encontrado.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: boolean
 *                 example: true
 *               datos:
 *                 type: object
 *                 properties:
 *                   servicio_id:
 *                    type: integer
 *                    example: 1
 *                 description:
 *                   type: string
 *                   example: "Servico de catering"
 *                 importe: 
 *                   type: number
 *                   example: 1500
 *      404:
 *        description: Servicio no encontrado.
 *      500:
 *        description: Error interno del servidor.
*/
// Obtener servicio por ID.
router.get('/:servicio_id', 
    cache('5 minutos'),
    passport.authenticate('jwt', { session: false }),
    autorizarUsuario([1,2]),
    serviciosControlador.buscarPorId
);

/**
 * @swagger
 * /api/v1/servicios/{servicio_id}:
 *   put:
 *     summary: Editar un servicio.
 *     tags: [Servicios]
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: servicio_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del servicio a editar. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *                 example: "Servicio actualizado de catering"
 *               importe:
 *                 type: number
 *                 example: 1800
 *     responses:
 *       200:
 *         description: Servicio actualizado exitosamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Servicio no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
// Editar un servicio.
router.put('/:servicio_id',
    passport.authenticate('jwt', { session: false }), 
    autorizarUsuario([1,2]),
    serviciosControlador.editarServicioPorId
);


/**
 * @swagger
 * /api/v1/servicios/:{servicio_id}:
 *   put:
 *     summary: Eliminar (borrado lógico) un servicio.
 *     tags: [Servicios]
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: servicio_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del servicio a eliminar. 
 *     
 *     responses:
 *       200:
 *         description: Servicio eliminado exitosamente (borrado lógico).
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: Servicio no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
// Eliminar (borrado lógico) un servicio.
router.delete('/:servicio_id',
    passport.authenticate('jwt', { session: false }), 
    autorizarUsuario([1,2]),
    serviciosControlador.eliminarServicioPorId
);


/**
 * @swagger
 * /api/v1/servicios:
 *   post:
 *     summary: Crear un servicio.
 *     tags: [Servicios]
 *     security: 
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - importe
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Servicio de limpieza."
 *               importe:
 *                 type: number
 *                 example: 1200
 *     
 *     reponses:
 *       201:
 *         description: Servicio creado correctamente.
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
 *                   example: "Servicio creado correctamente."
 *       400:
 *         description: Datos inválidos o faltantes.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error interno del servidor.
 */
// Crear servicio
router.post('/', 
    passport.authenticate('jwt', { session: false }), 
    autorizarUsuario([1,2]),
    [
        check('descripcion', 'La descripción es obligatoria.').notEmpty(),

        check('importe', 'El importe es obligatorio.').notEmpty(),
        check('importe', 'El importe debe ser un número mayor o igual a 0.').isInt({ min: 0}),
        validarCampos
    ],
    serviciosControlador.crearServicio
)


export { router };