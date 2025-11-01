import express from 'express';
import SalonesControlador from '../../controladores/salonesControlador.js';
import validarCampos from '../../controladores/salonesControlador.js';
import { cache } from '../../middlewares/apicache.js'
import { check } from 'express-validator';
import autorizarUsuarios from "../../middlewares/autorizarUsuario.js"

// Instancia
const salonesControlador = new SalonesControlador();

// Definicio de rutas con express.
const router = express.Router();


// Swagger.
/**
 * @swagger
 * tags:
 *   name: Salones
 *   description: Endpoints para administrar los salones.
 */

/**
 * @swagger
 * /api/v1/salones:
 *   get: 
 *     summary: Obtener todos los salones.
 *     tags: [Salones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: 
 *         description: Lista de salones.
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
 *                       salon_id:
 *                         type: integer
 *                         example: 1
 *                       titulo:
 *                         type: string
 *                         example: "Salón principal"
 *                       direccion:
 *                         type: string
 *                         example: "Calle falsa 123"
 *                       capacidad:
 *                         type: integer
 *                         example: 50
 *                       importe:
 *                         type: number
 *                         example: 2000
 *       500:
 *         description: Error interno del servidor.
 */
// autorizarUsuarios([1,2]) => 1 - Admin => 2 - Empleados.
// Solo el admin y los empelados pueden hacer BREAD de los salones.
// Usa el controlador de salones, y el metodo 'buscar todos()'.
// cache => Por 5 minutos los salones quedaran cacheados en la memoria del server.
router.get('/', cache('5 minutos'), autorizarUsuarios([1,2,3]), salonesControlador.buscarTodos);


/** 
 * @swagger
 * /api/v1/salones/{salon_id}:
 *   get:
 *     summary: Buscar un salón por ID.
 *     tags: [Salones]
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: salon_id
 *         require: true
 *         schema:
 *           type: string
 *         description: ID del salón.
 *
 *     responses:
 *      200:
 *       description: Salón encontrado.
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
 *                   salon_id:
 *                     type: integer
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     example: "Salón principal"
 *                   direccion:
 *                     type: string
 *                     example: "Calle falsa 123"
 *                   capacidad:
 *                     type: integer
 *                     example: 50
 *                   importe:
 *                     type: number
 *                     example: 2000
 *      404:
 *        description: Salón no encontrado.
 *      500:
 *        description: Error interno del servidor.
*/
// Busqueda por 'ID' de salon.
router.get('/:salon_id', cache('5 minutos'), autorizarUsuarios([1,2]), salonesControlador.buscarPorId);



/**
 * @swagger
 * /api/v1/salones/{salon_id}:
 *   put:
 *     summary: Editar un salón.
 *     tags: [Salones]
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: salon_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del salón a editar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               direccion:
 *                 type: string
 *               capacidad:
 *                 type: integer
 *               importe:
 *                 type: number
 *     
 *     responses:
 *       200:
 *         description: Salón actualizado correctamente.
 *       404:
 *         description: Salón no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
// Busca por 'ID' para editar el salón.
router.put('/:salon_id', autorizarUsuarios([1,2]), salonesControlador.editarSalonPorId);



/**
 * @swagger
 * /api/v1/salones/:{salon_id}:
 *   put:
 *     summary: Eliminar un salón por ID (borrado logico).
 *     tags: [Salones]
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: salon_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del salón a eliminar.
 * 
 *     response:
 *       200:
 *         description: Salón eliminado correctamente.
 *       404:
 *         description: Salón no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
// Busca por 'ID' para hacer el 'borrado logico'.
router.delete('/:salon_id', autorizarUsuarios([1,2]), salonesControlador.eliminarSalonPorId);


/**
 * @swagger
 * /api/v1/salones:
 *   post:
 *     summary: Crear un nuevo salón.
 *     tags: [Salones]
 *     security: 
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - titulo
 *              - direccion
 *              - capacidad
 *              - importe
 *            properties:
 *              titulo:
 *                type: string
 *                example: "Salón principal nuevo"
 *              direccion:
 *                type: string
 *                example: "Calle falsa 456"
 *              capacidad:
 *                type: integer
 *                example: 50
 *              importe:
 *                type: number
 *                example: 2000
 * 
 *     response:
 *       201:
 *         description: Salón creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: booblean
 *                   example: true
 *                 datos:
 *                   type: object
 *                   properties:
 *                     salon_id:
 *                       type: integer
 *                       example: 1
 *                     titulo:
 *                       type: string
 *                       example: "Salón principal nuevo"
 *       400: 
 *         description: Error de validación.
 *       500: 
 *         description: Error interno del servidor.
 */


// Crea un salón.
router.post('/', autorizarUsuarios([1,2]), 
    // Uso de express validator.
    // notEmpty() => Verifica que el campo no este vacio.
    // isInt() => Verifica que el campo sea un entero positivo, mayor o igual a 1.
    // isFloat() => Verifica que el campo sea (decimal o entero), mayor o igual a 0.
    [
        check('titulo', 'El titulo es necesario.').notEmpty(),
        check('direccion', 'La dirección es necesaria.').notEmpty(),

        check('capacidad', 'La capacidad es necesaria.').notEmpty(),
        check('capacidad', 'La capacidad es necesaria.').isInt({ min: 1}),

        check('importe', 'El importe es necesario.').notEmpty(),
        check('importe', 'El importe es necesario.').isFloat({min: 0}),
        validarCampos
    ],

    salonesControlador.crearSalon);

export { router };