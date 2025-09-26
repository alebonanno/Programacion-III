import { conexion } from "./conexion.js";

export default class Salones{
    // Busca todos los salones activos.
    buscarTodos = async() => {
        const sql = 'SELECT * FROM salones WHERE activo = 1';
        const [salones] = await conexion.execute(sql);
        // Retorna la información al servicio.
        return salones;
    }

    buscarPorId = async(salon_id) => {
        try{
            const sql = `SELECT * FROM salones WHERE salon_id = ? AND activo = 1`;
            const [results] = await conexion.query(sql, [salon_id]);
            // Toma el 1er salon que coincide con el 'id'.
            const salon = results[0]

            // Retorno de datos.
            return salon
        }catch (error){
            console.log('Error en la parte salones.js de db.', error);
            // Se usa throw, no se usa 'res.' desde db.
            throw error;
        }
    }
}