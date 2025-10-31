import express from "express"
import AuthControlador from "../../controladores/authControlador.js"
import { check } from "express-validator" 
import { validarCampos } from "../../middlewares/validarCampos.js"

const router = express.Router();
const authControlador = new AuthControlador();

router.post("/login", 
    [
        check("nombre_usuario", "El correo electronico es requerido").not().isEmpty(),
        check("nombre_usuario", "Revisar el formato del correo electronico").isEmail(),
        check("contrasenia", "La contraseña es requerida").not().isEmpty(),
        validarCampos
    ],
    authControlador.login);


export { router };