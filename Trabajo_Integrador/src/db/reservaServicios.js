import { conexion } from "./conexion.js"

export default class ReservasServicios {

    crear = async(reserva_id, servicios) => {
        try{
            // Inicio de transacción.
            await conexion.beginTransaction();

            // Armado SQL.
            for (const servicio of servicios){
                const sql = `
                INSERT INTO reservas_servicios(reserva_id, servicio_id, importe)
                VALUES (?,?,?)
                `;
                // Ejecuta.
                conexion.execute(sql, [reserva_id, servicio.servicio_id, servicio.importe])
            }

            // Cerrado/commiteo de transacción.
            await conexion.commit();

            return true;

        }catch (error){
            // Revierte la transacción.
            await conexion.rollback();
            console.log("Error en (DB): ", error);
            return false;
        }
    }

}