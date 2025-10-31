import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

export default class AuthControlador{
    login = async (req, res) => {
        // Debug.
        console.log("Body recibido: ", req.body)
        //Estrategia 'local'.
        passport.authenticate("local", { session: false }, (err, usuario, info) => {
            if (err || !usuario) {
                return res.status(400).json({
                    estado: false,
                    mensaje: "Solicitud incorrecta."
                });
            };

            // Armado de token y enviado al cliente.
            req.login(usuario, { session: false }, (err) => {
                if(err){
                    res.send(err);
                };

                // Debug
                console.log("Usuario a firmar:", usuario);
                console.log("usuario.usuario_id:", usuario.usuario_id);

                const payload = { 
                    usuario_id: usuario.usuario_id,
                    nombre_usuario: usuario.nombre_usuario,
                    tipo_usuario: usuario.tipo_usuario 
                };
                // console.log("Payload a firmar en el token: ", payload);
                // Armado del token con datos del usuario y una expiración.
                const token = jwt.sign(
                    payload, 
                    process.env.JWT_SECRET, 
                    { algorithm: "HS256", expiresIn: "1h" });

                return res.json ({
                    estado: true,
                    token: token
                });
            })
        // Pasa solicitud y respuesta al servicio.
        })(req, res);
    }
}