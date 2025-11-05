import UsuariosService from "../servicios/usuarioServicio.js";

class UsuarioController {

    constructor() {
        // Instancia de clase.
        this.usuariosService = new UsuariosService();
    }

    obtenerUsuarios = async (req, res) => {
        try {
            const usuarios = await this.usuariosService.buscarTodosUsers();
            res.status(200).json(usuarios);
        } catch (error) {
            console.error('Error al obtener usuarios (controlador)', error);
            res.status(500).json({
                mensaje: 'Error al obtener usuarios.'
            });
        }
    }

    crearUsuario = async (req, res) => {
        try {
            const nuevoUsuario = req.body;

            // Campos opcionales.
            nuevoUsuario.celular = nuevoUsuario.celular || null;
            nuevoUsuario.foto = nuevoUsuario.foto || null;
            nuevoUsuario.activo = 1;

            const UsuarioCreado = await this.usuariosService.crearUsuario(nuevoUsuario);
            res.status(201).json({
                ok: true,
                mensaje: 'Usuario creado correctamente.',
                UsuarioCreado
            });
        } catch (error) {
            console.error('Error al crear usuario (controaldor)', error);
            res.status(500).json({
                mensaje: 'Error al crear usuario.'
            });
        }
    }

    // Editar usuario.
    editarUsuario = async (req, res) => {
        try {
            const usuario_id = req.params.id;
            const usuarioActualizado = req.body;

            // Si viene 'contrasenia' en texto plano, convertir a MD5
            if (usuarioActualizado.contrasenia) {
                const crypto = await import('crypto');
                usuarioActualizado.contrasenia = crypto.default.createHash('md5')
                    .update(usuarioActualizado.contrasenia)
                    .digest('hex');
            }

            const resultado = await this.usuariosService.editarUsuario(usuario_id, usuarioActualizado);
            res.status(200).json({
                ok: true,
                mensaje: "Usuario actualizado correctamente.",
                usuario: resultado
            });
        } catch (error) {
            console.error("Error al editar usuario (controlador)", error);
            res.status(500).json({ mensaje: "Error al editar usuario." });
        }
    };

    // Borrar usuario.
    borrarUsuario = async (req, res) => {
        try {
            const usuario_id = req.params.id;
            const usuarioBorrado = await this.usuariosService.borrarUsuario(usuario_id);

            res.status(200).json({
                ok: true,
                mensaje: "Usuario desactivado correctamente.",
                usuario: usuarioBorrado
            });
        } catch (error) {
            console.error("Error al desactivar usuario (controlador)", error);
            res.status(500).json({
                mensaje: "Error al desactivar usuario."
            });
        }
    };


    // Buscar usuario por ID.
    buscarUsuarioPorId = async (req, res) => {
        try {
            const { usuario_id } = req.params;

            const usuario = await this.usuariosService.buscarPorId(usuario_id);

            if (!usuario) {
                return res.status(404).json({
                    ok: false,
                    mensaje: "Usuario no encontrado o inactivo."
                });
            }

            res.status(200).json({
                ok: true,
                usuario
            });

        } catch (error) {
            console.error("Error en 'buscarUsuarioPorId' (controlador)", error);
            res.status(500).json({
                ok: false,
                mensaje: "Error al buscar el usuario."
            });
        }
    };


};

export default new UsuarioController();