// Importe de objeto 'conexion', para poder ejeuctar consultas SQL.
import { conexion } from "./conexion.js";

export default class Reservas {
    
    // Devuelve todas las reservas activas.
    buscarTodos= async() => {
        const sql = 'SELECT * FROM reservas WHERE activo = 1';
        const [reservas] = await conexion.execute(sql);
        return reservas;
    };

    // Busca una reserva activa especifica por ID, si no encuentra devuelve null.
    buscarPorId = async (reserva_id) => {
        const sql = 'SELECT * FROM reservas WHERE activo = 1 AND reserva_id = ?';
        const [reserva] = await conexion.execute(sql, [reserva_id]);
        if (reserva.length === 0){
            return null;
        };
        return reserva[0];
    };

    // Inserta una nueva fila en la tabla 'reservas'.
    // Si es exitoso, busca y devuelve la reserva recien creada. mediante 'buscarPorId'.
    crear = async (reserva) => {
        const {
            fecha_reserva,
                salon_id,
                usuario_id,
                turno_id,
                foto_cumpleaniero, 
                tematica,
                importe_salon,
                importe_total 
            } = reserva;

        const sql = `
        INSERT INTO reservas
        (fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total) 
        VALUES (?,?,?,?,?,?,?,?)
        `;

        const [result] = await conexion.execute(sql, 
            [fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total]
        );

        if (result.affectedRows === 0) {
            return null;
        };

        return this.buscarPorId(result.insertId);

    };

    // Recupera información especifica de una reserva para mostrarla en una notificación.
    // Devuevle fecha de la reserva, nombre de salón, y orden del turno.
    // Realiza 'JOIN' con las tablas 'salones' y 'turnos'.
    datosParaNotificar = async(reserva_id) => {
        const sql = `SELECT r.fecha_reserva as fecha, s.titulo as salon, t.orden as turno
            FROM reservas as r
            INNER JOIN  salones as s on s.salon_id = r.salon_id 
            INNER JOIN  turnos as t on t.turno_id = r.turno_id
            WHERE r.activo = 1 and r.reserva_id = ?`;

        // conexion.execute() => siempre devuelve un array de resutlados, aunque solo haya 1 fila o ninguna.
        const [reserva] = await conexion.execute(sql, [reserva_id]);
        if (reserva.length === 0) {
            return null;
        };

        // Devuelve un objeto con todos los campos de la reserva que coincide con el 'reserva_id'.
        // Sin esto no se puede devolver directamente 'reserva', porque es un array, no un objeto individual.
        // reserva[0]; => Asi si puedo obtener el objeto con la info.
        return reserva[0];
    };

};