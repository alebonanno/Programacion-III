import express from 'express';
import usuarioController from '../../controladores/usuariosControlador.js'
import autorizarUsuario from "../../middlewares/autorizarUsuario.js"
import passport from 'passport';


// CRUD solo admin.

// Otra forma de importar 'Router' de express.
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para gestionar los usuarios.
*/


/**
 * @swagger
 * /api/v1/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 datos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       usuario_id:
 *                         type: integer
 *                         example: 1
 *                       nombre:
 *                         type: string
 *                         example: "Emanuel"
 *                       apellido:
 *                         type: string
 *                         example: "Comas"
 *                       nombre_usuario:
 *                         type: string
 *                         example: "Emanu"
 *                       contrasenia:
 *                         type: string
 *                         example: "81dc9bdb52d04dc20036dbd8313ed055"
 *                       tipo_usuario:
 *                         type: integer
 *                         example: 3
 *                       celular:
 *                         type: string
 *                         nullable: true
 *                         example: "123456789"
 *                       foto:
 *                         type: string
 *                         nullable: true
 *                       activo:
 *                         type: integer
 *                         example: 1
 *                       creado:
 *                         type: string
 *                         format: date-time
 *                       modificado:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: No autorizado o token inválido.
 *       403:
 *         description: Rol no permitido.
 *       500:
 *         description: Error interno del servidor.
 */
// GET /usuarios. => Solo admin.
// Obtener todos los usuarios
router.get('/', 
    passport.authenticate('jwt', { session: false }),
    autorizarUsuario([1, 2]),
    usuarioController.obtenerUsuarios
);


/**
 * @swagger
 * /api/v1/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Emanuel"
 *               apellido:
 *                 type: string
 *                 example: "Comas"
 *               nombre_usuario:
 *                 type: string
 *                 example: "Emanu"
 *               contrasenia:
 *                 type: string
 *                 example: "1234"
 *               tipo_usuario:
 *                 type: integer
 *                 example: 3
 *               celular:
 *                 type: string
 *                 nullable: true
 *                 example: "123456789"
 *               foto:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Usuario creado correctamente.
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
 *                   example: "Usuario creado correctamente."
 *                 UsuarioCreado:
 *                   type: object
 *                   properties:
 *                     usuario_id:
 *                       type: integer
 *                       example: 9
 *                     nombre:
 *                       type: string
 *                       example: "Emanuel"
 *                     apellido:
 *                       type: string
 *                       example: "Comas"
 *                     nombre_usuario:
 *                       type: string
 *                       example: "Emanu"
 *                     contrasenia:
 *                       type: string
 *                       example: "81dc9bdb52d04dc20036dbd8313ed055"
 *                     tipo_usuario:
 *                       type: integer
 *                       example: 3
 *                     celular:
 *                       type: string
 *                       nullable: true
 *                       example: "123456789"
 *                     foto:
 *                       type: string
 *                       nullable: true
 *                     activo:
 *                       type: integer
 *                       example: 1
 *                     creado:
 *                       type: string
 *                       format: date-time
 *                     modificado:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: No autorizado o token inválido.
 *       403:
 *         description: Rol no permitido.
 *       500:
 *         description: Error interno del servidor.
 */
// POST
// Crear usuario.
router.post('/', 
    passport.authenticate('jwt', { session: false }),
    autorizarUsuario([1]),
    usuarioController.crearUsuario
);


/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   put:
 *     summary: Editar un usuario.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a editar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "EmanuelUpdated"
 *               apellido:
 *                 type: string
 *                 example: "Comas"
 *               nombre_usuario:
 *                 type: string
 *                 example: "EmanuUpdated"
 *               contrasenia:
 *                 type: string
 *                 example: "5678"
 *               tipo_usuario:
 *                 type: integer
 *                 example: 3
 *               celular:
 *                 type: string
 *                 nullable: true
 *                 example: "987654321"
 *               foto:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente.
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
 *                   example: "Usuario actualizado correctamente."
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     usuario_id:
 *                       type: integer
 *                       example: 9
 *                     nombre:
 *                       type: string
 *                       example: "EmanuelUpdated"
 *                     apellido:
 *                       type: string
 *                       example: "Comas"
 *                     nombre_usuario:
 *                       type: string
 *                       example: "EmanuUpdated"
 *                     contrasenia:
 *                       type: string
 *                       example: "b724e91105f63322ca6ba454acf8b07b"
 *                     tipo_usuario:
 *                       type: integer
 *                       example: 3
 *                     celular:
 *                       type: string
 *                       nullable: true
 *                       example: "987654321"
 *                     foto:
 *                       type: string
 *                       nullable: true
 *                     activo:
 *                       type: integer
 *                       example: 1
 *                     creado:
 *                       type: string
 *                       format: date-time
 *                     modificado:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: No autorizado o token inválido.
 *       403:
 *         description: Rol no permitido.
 *       500:
 *         description: Error interno del servidor.
 */
// PUT
// Editar usuario.
router.put('/:id', 
    passport.authenticate('jwt', { session: false }),
    autorizarUsuario([1]),
    usuarioController.editarUsuario
);


/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   delete:
 *     summary: Desactivar un usuario (borrado lógico).
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a desactivar.
 *     responses:
 *       200:
 *         description: Usuario desactivado correctamente.
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
 *                   example: "Usuario desactivado correctamente."
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     usuario_id:
 *                       type: integer
 *                       example: 9
 *                     nombre:
 *                       type: string
 *                       example: "EmanuelUpdated"
 *                     activo:
 *                       type: integer
 *                       example: 0
 *                     modificado:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: No autorizado o token inválido.
 *       403:
 *         description: Rol no permitido.
 *       500:
 *         description: Error interno del servidor.
 */
//DELETE
// Borrado lógico de usuario.
router.delete('/id', 
    passport.authenticate('jwt', { session: false }),
    autorizarUsuario([1]),
    usuarioController.borrarUsuario
)
    

/**
 * @swagger
 * /api/v1/usuarios/{usuario_id}:
 *   get:
 *     summary: Obtener un usuario por su ID
 *     description: Retorna los datos de un usuario activo por su ID.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a buscar
 *     responses:
 *       200:
 *         description: Usuario encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     usuario_id:
 *                       type: integer
 *                       example: 1
 *                     nombre:
 *                       type: string
 *                       example: "Juan Perez"
 *                     email:
 *                       type: string
 *                       example: "juan@example.com"
 *                     activo:
 *                       type: boolean
 *                       example: true
 *                     creado:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-04T01:00:00Z"
 *                     modificado:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-04T01:30:00Z"
 *       404:
 *         description: Usuario no encontrado o inactivo
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
 *                   example: "Usuario no encontrado o inactivo."
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
 *                   example: "Error al buscar el usuario."
 */
router.get("/:usuario_id",
    passport.authenticate('jwt', { session: false }),
    autorizarUsuario([1]),
    usuarioController.buscarUsuarioPorId
);


export default router;