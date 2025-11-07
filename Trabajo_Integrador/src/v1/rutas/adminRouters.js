import express from 'express';
const router = express.Router();
import { getLogStats } from '../../controladores/logController.js';
import passport from 'passport';
import autorizarUsuarios from "../../middlewares/autorizarUsuario.js"



/**
 * @swagger
 * /api/v1/logs:
 *   get:
 *     summary: Obtener estadísticas de actividad por IP
 *     description: >
 *       Devuelve un listado con el total de peticiones agrupadas por dirección IP,
 *       incluyendo la cantidad de solicitudes por método HTTP y por ruta utilizada.
 *       Solo accesible para administradores autenticados.
 *     tags:
 *       - Administración SOC
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas de actividad por IP
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ip:
 *                     type: string
 *                     example: "localhost"
 *                   total:
 *                     type: integer
 *                     example: 236
 *                   métodos:
 *                     type: object
 *                     additionalProperties:
 *                       type: integer
 *                     example:
 *                       GET: 195
 *                       POST: 33
 *                       PUT: 8
 *                   rutas:
 *                     type: object
 *                     additionalProperties:
 *                       type: integer
 *                     example:
 *                       /api/v1/auth/login: 25
 *                       /api/v1/reservas: 10
 *                       /api/v1/salones: 11
 *                       /api/v1/usuarios: 21
 *       401:
 *         description: No autorizado (JWT faltante o inválido)
 *       403:
 *         description: Acceso denegado (no es administrador)
 *       500:
 *         description: Error interno del servidor (no se pudo leer el log)
 */
// Ruta de admin para ver actividad por IP
router.get('/',
    passport.authenticate('jwt', { session: false }),
    autorizarUsuarios([1]),
    getLogStats
);

export { router };
