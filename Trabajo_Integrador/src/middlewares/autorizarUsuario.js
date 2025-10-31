// [] => Recibe los tipos incluidos "1, 2 o 3".
export default function autorizarUsuario(perfilAutorizados = [] ) {
    return (req, res, next) => {
        const usuario = req.user;

        // Verifica que el usuario sea alguno de los tipos incluidos en la ruta de reservas.
        // ej => router.get('/:reserva_id', autorizarUsuarios([1,2,3]), reservasControlador.buscarPorId);
        // [1,2,3] estan incluidos.
        if(!usuario || !perfilAutorizados.includes(usuario.tipo_usuario)) {
            // Debug
            console.log("Usuario en req.user: ", req.user);
            // No esta incluido.
            return res.status(403).json({
                estado: "Falla",
                mensaje: "Acceso denegado"
            })
        }

        // Está incluido, continua con el metodo del controlador.
        next();
    }
}