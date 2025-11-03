import Usuarios from "../db/usuarios.js"

export default class UsuariosService {
    constructor(){
        this.usuarios = new Usuarios();
    }

    buscar = (nombre_usuario, contrasenia) => {
        return this.usuarios.buscar(nombre_usuario, contrasenia);
    }

    buscarPorId = (usuario_id) => {
        return this.usuarios.buscarPorId(usuario_id);
    }

    // Todos los usuarios.
    async buscarTodosUsers(){
        return await this.usuarios.buscarTodosUsers();
    }

    crearUsuario = async (usuario) => {
        return await this.usuarios.insertarUsuario(usuario);
    }

    editarUsuario = async (usuario_id, usuario) => {
        return await this.usuarios.editarUsuario(usuario_id, usuario);
    }

    // Borrado lógico.
    borrarUsuario = async (usuario_id) => {
        return await this.usuarios.borrarUsuario(usuario_id);
    }
}