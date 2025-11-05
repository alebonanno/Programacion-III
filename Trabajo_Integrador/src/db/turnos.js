import { conexion } from "./conexion.js";

export default class Turnos {
    // Creación del turno
    crearTurno = async (turno) => {
        const sql = `
            INSERT INTO turnos (orden, hora_desde, hora_hasta, activo, creado, modificado)
            VALUES (?, ?, ?, 1, NOW(), NOW());
        `;
        const {
            orden,
            hora_desde,
            hora_hasta
        } = turno;

        const [result] = await conexion.execute(sql, [orden, hora_desde, hora_hasta]);

        return {
            turno_id: result.insertId,
            ...turno,
            activo: 1,
            creado: new Date(),
            modificado: new Date()
        };
    };

    // Editar turno
    editarTurno = async (turno_id, turno) => {
        const sql = `
            UPDATE turnos
            SET orden = ?, 
                hora_desde = ?, 
                hora_hasta = ?, 
                modificado = NOW()
            WHERE turno_id = ?;
        `;
        const { orden,
            hora_desde,
            hora_hasta
        } = turno;

        await conexion.execute(sql, [orden, hora_desde, hora_hasta, turno_id]);

        const [result] = await conexion.execute(`SELECT * FROM turnos WHERE turno_id = ?`, [turno_id]);
        return result[0];
    };

    // Borrado lógico
    borrarTurno = async (turno_id) => {
        const sql = `
            UPDATE turnos
            SET activo = 0,
                modificado = NOW()
            WHERE turno_id = ?;
        `;
        await conexion.execute(sql, [turno_id]);

        const [result] = await conexion.execute(`SELECT * FROM turnos WHERE turno_id = ?`, [turno_id]);
        return result[0];
    };

    // Obtener todos los turnos
    buscarTodosTurnos = async () => {
        const sql = `
        SELECT * FROM turnos;
        `;

        const [turnos] = await conexion.execute(sql);
        return turnos;
    };


    // Buscar turno por ID
    buscarTurnoPorId = async (id) => {
        try {
            const sql = `
            SELECT * FROM turnos WHERE turno_id = ?
            `;
            const [results] = await conexion.query(sql, [id]);

            // Agarra el primer turno con el ID que le llega.
            const turno = results[0];

            if (!turno) {
                return {
                    ok: false,
                    error: 'No se encontró el turno.'
                };
            }

            // Retorna los datos.
            return {
                ok: true,
                turno
            };

        } catch (error) {
            console.log('Error en buscarTurnoPorId (db)', error);
            throw error;
        }
    };
}