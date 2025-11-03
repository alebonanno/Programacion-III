import { conexion } from "./conexion.js";

export default class Usuarios{
    buscar = async (nombre_usuario, contrasenia) => {
        const sql = `
        SELECT u.usuario_id, CONCAT(u.nombre, ' ', u.apellido) as usuario, u.tipo_usuario
        FROM usuarios  AS u
        WHERE u.nombre_usuario = ? 
        AND u.contrasenia = MD5(?)
        AND u.activo = 1 
        `;
        const [result] = await conexion.query(sql, [nombre_usuario, contrasenia]);
        return result[0];
    }

    buscarPorId = async (usuario_id) => {
        const sql = `
        SELECT CONCAT(u.nombre, ' ', u.apellido) as usuario, u.tipo_usuario, u.usuario_id
        FROM usuarios  AS u
        WHERE u.usuario_id = ? AND u.activo = 1
        ;`
        const [result] = await conexion.query(sql, [usuario_id]);
        return result[0];
    }


    // Todos los usuarios.
    buscarTodosUsers = async () => {
        const sql = `
        SELECT * FROM usuarios
        `;
        const [usuarios] = await conexion.execute(sql);
        return usuarios;
    };

    insertarUsuario = async (usuario) => {
        const sql = `
        INSERT INTO usuarios
        (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto, activo, creado, modificado)
        VALUES (?, ?, ?, MD5(?), ?, ?, ?, ?, NOW(), NOW())
        `;

        const { 
            nombre, 
            apellido, 
            nombre_usuario, 
            contrasenia, 
            tipo_usuario, 
            celular, 
            foto, 
            activo
        } = usuario;

        const [result] = await conexion.execute(sql, [
            nombre, 
            apellido, 
            nombre_usuario, 
            contrasenia, 
            tipo_usuario, 
            celular, 
            foto, 
            activo
        ]);

        // Lee el registro/usuario recién insertado/creado.
        const [UsuarioCreado] = await conexion.query(
            'SELECT * From usuarios WHERE usuario_id = ?',
            [result.insertId]
        );
        return UsuarioCreado[0];
        
    };

    // Editar usuario.
    editarUsuario = async (usuario_id, usuario) => {
        const sql = `
            UPDATE usuarios
            SET nombre = ?,
                apellido = ?,
                nombre_usuario = ?,
                contrasenia = ?,
                tipo_usuario = ?,
                celular = ?,
                foto = ?,
                modificado = NOW()
            WHERE usuario_id = ?;
        `;
        const { nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular = null, foto = null } = usuario;

        await conexion.execute(sql, [
            nombre,
            apellido,
            nombre_usuario,
            contrasenia,
            tipo_usuario,
            celular,
            foto,
            usuario_id
        ]);

        // Retorna el usuario actualizado
        const [result] = await conexion.execute(`SELECT * FROM usuarios WHERE usuario_id = ?`, [usuario_id]);
        return result[0];
    };

    // Borrado lógico.
    BorrarUsuario = async (usuario_id) => {
        const sql = `
        UPDATE usuarios
        SET activo = 0,
            modificado = NOW()
        WHERE usuario_id = ?;
    `;
    await conexion.execute(sql, [usuario_id]);

    // Retorna el usuario con activo = 0
    const [result] = await conexion.execute(`SELECT * FROM usuarios WHERE usuario_id = ?`, [usuario_id]);
    return result[0];
    }
}