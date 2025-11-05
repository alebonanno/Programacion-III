import { conexion } from "./conexion.js";

export default class Servicios{
    // Busca todos los servicios activos.
    buscarTodos = async() => {
        const sql = 'SELECT * FROM servicios';
        const [servicios] = await conexion.execute(sql);
        // Retorna la información al servicio.
        return servicios;
    };

    buscarPorId = async(servicios_id) => {
        try{
            const sql = `SELECT * FROM servicios WHERE servicio_id = ?`;
            const [results] = await conexion.query(sql, [servicios_id]);
            // Toma el 1er servicio que coincide con el 'id'.
            const servicio = results[0]

            // Retorno de datos.
            return servicio
        }catch (error){
            console.log('Error en la parte servicios.js de db.', error);
            // Se usa throw, no se usa 'res.' desde db.
            throw error;
        }
    };

    // Editar activo tambien o dejarlo tal cual, asi se evitar 'null'.
    editarServicioPorId = async(servicio_id, datos) => {
        try{
            const {descripcion, importe} = datos;

            const sql = `
                UPDATE servicios
                SET descripcion = ?, importe = ?, modificado = NOW()
                WHERE servicio_id = ?
            `;

            const [results] = await conexion.query(sql, [
                descripcion, importe, servicio_id
            ]);
            // Debug para ver affectedRows.
            console.log(results);

            // Verifica si se actualizo algún registro.
            if(results.affectedRows === 0){
                return ({
                    ok:false, 
                    error: 'No se encontro el servicio (db).'
                });
            };

            // Retorno exitoso.
            return { 
                ok: true, 
                mensaje: 'Servicio actualizado correctamente.' 
            };

        }catch (error){
            console.log('Error en editarServicio (servicios.js)', error);
            throw error
        }
    };

    // Solo simula el 'borralo logico'.
    eliminarPorId = async (servicio_id) => {
        try{

            const sql = `
                UPDATE servicios
                SET activo = 0, modificado = NOW()
                WHERE servicio_id =? AND activo = 1
            `;

            const [result] = await conexion.query(sql, [servicio_id]);

            if (result.affectedRows === 0) {
                return {
                    ok: false,
                    error: 'Servicio no encontrado o ya estaba inactivo.'
                };
            }

            // 'mensaje => Servicio => Controlador.'
            return {
                ok: true,
                mensaje: 'Servicio desactivado correctamente.'
            };

        }catch (error){
            console.log('Error en eliminarPorId (servicios.js => db)', error);
            throw error;
        }
    };


    //  Creacion del servicio para la 'db'.
    // Recibe el objeto 'datos' con info necesaria.
    crearServicio = async (datos) => {
        try{
            // Extracción de campos necesarios del objeto 'datos'.
            const {
                descripcion,
                importe
            } = datos;

            // Sentencia sql para insertar un nuevo servicio.
            const sql = `
                INSERT INTO servicios (descripcion, importe, activo, creado)
                VALUES (?, ?, 1, NOW())
            `;

            // Se ejecuta la consulta y espera el resultado.
            const [resultado] = await conexion.query(sql, [
                descripcion,
                importe
            ]);
            console.log("INSERT resultado: ", resultado)

            // Retorna un objeto con exito y el 'ID' generado.
            return {
                ok: true,
                mensaje: 'servicio creado correctamente.',
                servicio_id: resultado.insertId
            };

        }catch (error){
            console.log(" Error al crear servicio (db/servicios.js)", error);
            // throw => Si hubo un error aqui, no lo maneja, lo pasa para que lo maneje quien llamo la función.
            // Manda el error a 'servicio'.
            throw error;
        }
    };
}