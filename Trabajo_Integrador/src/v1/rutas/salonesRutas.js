import express from 'express';
import SalonesControlador from '../../controladores/salonesControlador.js';
import { validarCampos } from '../../middlewares/validarCampos.js'
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
router.get('/', cache('5 minutos'), 
autorizarUsuarios([1,2,3]), 
salonesControlador.buscarTodos
);


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
router.get('/:salon_id', 
    cache('5 minutos'), 
    autorizarUsuarios([1,2]), 
    salonesControlador.buscarPorId
);



/**
 * @swagger
 * /api/v1/salones/{salon_id}:
 *   put:
 *     summary: Editar un salón existente por ID.
 *     description: Actualiza los datos de un salón existente. Solo accesible para administradores o empleados autorizados.
 *     tags: [Salones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: salon_id
 *         required: true
 *         description: ID del salón a actualizar.
 *         schema:
 *           type: integer
 *           example: 12
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Nuevo nombre o título del salón.
 *                 example: "Salón principal nuevo 22"
 *               direccion:
 *                 type: string
 *                 description: Nueva dirección del salón.
 *                 example: "Calle falsa 4561"
 *               latitud:
 *                 type: number
 *                 format: float
 *                 nullable: true
 *                 description: Coordenada de latitud (puede ser null).
 *                 example: null
 *               longitud:
 *                 type: number
 *                 format: float
 *                 nullable: true
 *                 description: Coordenada de longitud (puede ser null).
 *                 example: null
 *               capacidad:
 *                 type: integer
 *                 description: Capacidad máxima de personas.
 *                 example: 501
 *               importe:
 *                 type: number
 *                 format: float
 *                 description: Precio base o costo de alquiler.
 *                 example: 2000.00
 *               activo:
 *                 type: integer
 *                 description: Indica si el salón está activo (1) o inactivo (0).
 *                 example: 1
 *           example:
 *             titulo: "Salón principal nuevo 22"
 *             direccion: "Calle falsa 4561"
 *             latitud: null
 *             longitud: null
 *             capacidad: 501
 *             importe: "2000.00"
 *             activo: 1
 *     responses:
 *       200:
 *         description: Salón actualizado correctamente.
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
 *                   example: "Salón actualizado correctamente."
 *       400:
 *         description: Datos inválidos o campos faltantes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Faltan datos obligatorios o formato inválido."
 *       404:
 *         description: Salón no encontrado o inactivo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "No se encontró el salón o está inactivo."
 *       401:
 *         description: Token no proporcionado o usuario no autorizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "No autorizado."
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error al intentar actualizar el salón."
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
 *     summary: Crea un nuevo salón.
 *     description: Permite registrar un nuevo salón en el sistema. Solo accesible para administradores o empleados autorizados.
 *     tags: [Salones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - direccion
 *               - capacidad
 *               - importe
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Nombre o título del salón.
 *                 example: "Salón Principal"
 *               direccion:
 *                 type: string
 *                 description: Dirección física del salón.
 *                 example: "Calle Falsa 456"
 *               capacidad:
 *                 type: integer
 *                 description: Capacidad máxima de personas que puede albergar el salón.
 *                 example: 50
 *               importe:
 *                 type: number
 *                 format: float
 *                 description: Precio base de alquiler del salón.
 *                 example: 2000.00
 *     responses:
 *       201:
 *         description: Salón creado correctamente.
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
 *                   example: "Salón creado correctamente."
 *                 salon_id:
 *                   type: integer
 *                   example: 12
 *       400:
 *         description: Datos inválidos o campos obligatorios faltantes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Faltan datos obligatorios."
 *       401:
 *         description: Token no proporcionado o inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "No autorizado."
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Error interno al crear el salón."
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

    salonesControlador.crearSalon
);

export { router };