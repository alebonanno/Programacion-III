import express from "express"
import AuthControlador from "../../controladores/authControlador.js"
import { check } from "express-validator"
import { validarCampos } from "../../middlewares/validarCampos.js"

const router = express.Router();
const authControlador = new AuthControlador();


// Swagger
/** 
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *                 example: pamgom@correo.com
 *               contrasenia:
 *                 type: string
 *                 example: pamgom
 *
 *     responses:
 *      200:
 *       description: Usuario autenticado correctamente.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token: 
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoyLCJ0aXBvX3VzdWFyaW8iOjMsImlhdCI6MTc2MTkzMzAwMiwiZXhwIjoxNzYxOTM2NjAyfQ.tHPowThQ0t-0qc7MwYW9-EjNyWrOHTqUmdjJtk65gb4
 *      400:
 *        description: Error de validación.
 *      401:
 *        description: Usuario o contraseña incorrectos.
*/
router.post("/login",
    [
        check("nombre_usuario", "El correo electronico es requerido").not().isEmpty(),
        check("nombre_usuario", "Revisar el formato del correo electronico").isEmail(),
        check("contrasenia", "La contraseña es requerida").not().isEmpty(),
        validarCampos
    ],
    authControlador.login);


export { router };