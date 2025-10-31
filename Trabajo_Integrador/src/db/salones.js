import { conexion } from "./conexion.js";

export default class Salones{
    // Busca todos los salones activos.
    buscarTodos = async() => {
        const sql = 'SELECT * FROM salones WHERE activo = 1';
        const [salones] = await conexion.execute(sql);
        // Retorna la información al servicio.
        return salones;
    };

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
    };

    // Editar activo tambien o dejarlo tal cual, asi se evitar 'null'.
    editarSalonPorId = async(salon_id, datos) => {
        try{
            const {titulo, direccion, latitud, longitud, capacidad, importe, activo} = datos;

            const sql = `
                UPDATE salones
                SET titulo = ?, direccion = ?, latitud = ?, longitud = ?, capacidad = ?, importe = ?, activo = ?, modificado = NOW()
                WHERE salon_id = ?
            `;

            const [results] = await conexion.query(sql, [
                titulo, direccion, latitud, longitud, capacidad, importe, activo, salon_id
            ]);
            // Debug para ver affectedRows.
            console.log(results);

            // Verifica si se actualizo algún registro.
            if(results.affectedRows === 0){
                return ({
                    ok:false, 
                    error: 'No se encontro el salón o está inactivo.'
                });
            };

            // Retorno exitoso.
            return { 
                ok: true, 
                mensaje: 'Salón actualizado correctamente.' 
            };

        }catch (error){
            console.log('Error en editarSalón (salones.js)', error);
            throw error
        }
    };

    // Solo simula el 'borralo logico'.
    eliminarPorId = async (salon_id) => {
        try{

            const sql = `
                UPDATE salones
                SET activo = 0, modificado = NOW()
                WHERE salon_id =? AND activo = 1
            `;

            const [result] = await conexion.query(sql, [salon_id]);

            if (result.affectedRows === 0) {
                return {
                    ok: false,
                    error: 'Salón no encontrado o ya estaba inactivo.'
                };
            }

            // 'mensaje => Servicio => Controlador.'
            return {
                ok: true,
                mensaje: 'Salón desactivado correctamente.'
            };

        }catch (error){
            console.log('Error en eliminarPoId (salones.js => db)', error);
            throw error;
        }
    };


    //  Creacion del salón para la 'db'.
    // Recibe el objeto 'datos' con info necesaria.
    crearSalon = async (datos) => {
        try{
            // Extracción de campos necesarios del objeto 'datos'.
            const {
                titulo,
                direccion,
                latitud,
                longitud,
                capacidad,
                importe
            } = datos;

            // Sentencia sql para insertar un nuevo salón.
            const sql = `
                INSERT INTO salones (titulo, direccion, latitud, longitud, capacidad, importe, activo, creado)
                VALUES (?, ?, ?, ?, ?, ?, 1, NOW())
            `;

            // Se ejecuta la consulta y espera el resultado.
            const [resultado] = await conexion.query(sql, [
                titulo, 
                direccion, 
                latitud, 
                longitud, 
                capacidad, 
                importe
            ]);

            // Retorna un objeto con exito y el 'ID' generado.
            return {
                ok: true,
                mensaje: 'Salón crado correctamente.',
                salon_id: resultado.insertId
            };

        }catch (error){
            console.log(" Error al crear salón (db/salones.js)");
            // throw => Si hubo un error aqui, no lo maneja, lo pasa para que lo maneje quien llamo la función.
            // Manda el error a 'servicio'.
            throw error;
        }
    };
}