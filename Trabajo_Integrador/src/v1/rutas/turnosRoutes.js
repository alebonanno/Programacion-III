import { Router } from 'express';
import TurnosController from '../../controladores/turnosControlador.js'
import autorizarUsuario from "../../middlewares/autorizarUsuario.js"
import passport from 'passport';

const router = Router();
const turnosController = new TurnosController();


/**
 * @swagger
 * tags:
 *   name: Turnos
 *   description: Gestión de turnos
 */


/**
 * @swagger
 * /api/v1/turnos:
 *   get:
 *     summary: Obtener todos los turnos
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turnos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 turnos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       turno_id:
 *                         type: integer
 *                         example: 1
 *                       orden:
 *                         type: integer
 *                         example: 1
 *                       hora_desde:
 *                         type: string
 *                         example: "08:00"
 *                       hora_hasta:
 *                         type: string
 *                         example: "10:00"
 *                       activo:
 *                         type: integer
 *                         example: 1
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/",
  passport.authenticate("jwt", { session: false }),
  autorizarUsuario([1]),
  turnosController.obtenerTurnos
);


/**
 * @swagger
 * /api/v1/turnos:
 *   post:
 *     summary: Crear un turno
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orden
 *               - hora_desde
 *               - hora_hasta
 *             properties:
 *               orden:
 *                 type: integer
 *                 example: 1
 *               hora_desde:
 *                 type: string
 *                 example: "08:00"
 *               hora_hasta:
 *                 type: string
 *                 example: "10:00"
 *     responses:
 *       201:
 *         description: Turno creado correctamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/",
  passport.authenticate("jwt", { session: false }),
  autorizarUsuario([1]),
  turnosController.crearTurno
);


/**
 * @swagger
 * /api/v1/turnos/{id}:
 *   put:
 *     summary: Editar un turno
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orden:
 *                 type: integer
 *               hora_desde:
 *                 type: string
 *               hora_hasta:
 *                 type: string
 *     responses:
 *       200:
 *         description: Turno actualizado correctamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/:id",
  passport.authenticate("jwt", { session: false }),
  autorizarUsuario([1]),
  turnosController.editarTurno
);


/**
 * @swagger
 * /api/v1/turnos/{id}:
 *   delete:
 *     summary: Borrado lógico de un turno => activo = 0
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno
 *     responses:
 *       200:
 *         description: Turno eliminado => activo = 0
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id",
  passport.authenticate("jwt", { session: false }),
  autorizarUsuario([1]),
  turnosController.borrarTurno
);


export default router;