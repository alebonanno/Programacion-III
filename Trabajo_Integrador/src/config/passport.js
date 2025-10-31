import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
import { Strategy as LocalStrategy } from "passport-local"
// Nuevo servicio de usuarios.
import UsuariosService from "../servicios/usuarioServicio.js"
import dotenv from "dotenv";
dotenv.config();

console.log("Este es el JWT_SECRET: ", process.env.JWT_SECRET);
// Estrategia local de 'passport'.
const estrategia = new LocalStrategy({
    // "nombre_usuario" => Es el correo.
    usernameField: 'nombre_usuario',
    passwordField: 'contrasenia'
}, 
    async (nombre_usuario, contrasenia, done) => {
        try{
            const usuariosServicio = new UsuariosService();
            console.log("Intentandio login con usuario: ", nombre_usuario)
            const usuario = await usuariosServicio.buscar(nombre_usuario, contrasenia);
            console.log("Usuario encontrado:", usuario);
            if (!usuario){
                return done(null, false, {mensaje: "Login incorrecto."});
            }
            return done(null, usuario, {mensaje: "Login correcto."});
        }catch(exc){
            done(exc);
        }
    }
)

// Validación de token.
const validacion = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
    async (jwtPayload, done) => {
        console.log("=== JWT Payload recibido ===", jwtPayload);

        const usuariosServicio = new UsuariosService();
        const usuario = await usuariosServicio.buscarPorId(jwtPayload.usuario_id);
        console.log("JWT Payload recibido:", jwtPayload);
        console.log("Resultado de buscarPorId:", usuario);

        if(!usuario){
            return done(null, false, {mensaje: "Token incorrecto."});
        }
        return done(null, usuario);
    }
)
export { estrategia, validacion };