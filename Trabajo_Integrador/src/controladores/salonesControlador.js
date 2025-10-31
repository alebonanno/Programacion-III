import Salones from "../db/salones.js";
import SalonesServicio from "../servicios/salonesServicio.js";
import { apicacheInstance } from '../middlewares/apicache.js';

export default class SalonesControlador{
    
    constructor(){
        // Instancia del servicio.
        this.SalonesServicio = new SalonesServicio();
    }

    buscarTodos = async (req, res) => {
        try{
            // Se le pide a servicios 'buscarTodos()', y se guarda en 'const salones'.
            const salones = await this.SalonesServicio.buscarTodos();
            
            res.status(200).json({
                'ok': true, 
                'salones':salones
            });

        }catch (error){
            console.log('Error en GET /salones'. error);
            res.status(500).json({
                'ok': false, 
                mensaje: 'Error interno del servidor.'
            });
        }

    };

    buscarPorId = async (req, res) => {
        try{
            // Extrae el 'ID' de los parámetros de la URL.
            const { salon_id } = req.params;
            const salon = await this.SalonesServicio.buscarPorId(salon_id);

            if (!salon){
                // Si en 'db' es null o algun error, responde 404 aqui en controlador.
                // Esto se muestra en 'bruno'.
                return res.status(404).json({
                    ok: false,
                    mensaje: 'Salón no encontrado o inactivo.'
                });
            }
            
            // Respuesta exitosa.
            res.status(200).json({
                    'ok': true, 
                    'salon':salon
            });
        }catch (error){
            console.log("Error en GET /salones(:salon_id: ", error);
            res.status(404).json({
                    'ok': false, 
                    mensaje: 'Salón no encontrado.'
            });
        }
    };


    editarSalonPorId = async (req, res) => {
        try{
            const { salon_id } = req.params;
            const datos = req.body;

            // Para que 'activo' tenga un valor siempre y no 'Null'.
            if (typeof datos.activo === 'undefined' || datos.activo === null) {
                // Se le asigna '0' inactivo, por defecto.
                datos.activo = 0;
            };

            // Ejecuta método 'editarPoId' de 'SalonesServicio'.
            // Se le pasa 'salon_id' y los nuevos datos.
            // Espera la respuesta de SalonesServicio.
            const resultado = await this.SalonesServicio.editarPorId(salon_id, datos);

            // Verifica si la operación fue falsa.
            if (!resultado.ok){
                return res.status(404).json(resultado);
            };

            // Limpia el caché.
            apicacheInstance.clear('/salones');
            apicacheInstance.clear('/salones/${salon_id}');

            // Return exitoso.
            return res.status(200).json({
                ok:true,
                mensaje:'Salón actualizado correctamente.'
            });
            
        }catch (error){
            console.log('Error en editarSalonPoId(Controlador): ', error);
            return res.status(500).json({
                ok:false,
                error: 'Ocurrio un error al intentar actualizar el salón.'
            });
        };
    };

    // Borrado logico por ID.
    eliminarSalonPorId = async (req, res) => {
        try{
            const { salon_id } = req.params;
            const resultado = await this.SalonesServicio.eliminarPorId(salon_id);

            if (!resultado.ok){
                return res.status(404).json(resultado);
            }

            // Limpia el caché.
            apicacheInstance.clear('/salones');
            apicacheInstance.clear('/salones/${salon_id}');

            // 'mensaje(db) => Servicio => Controlador.'
            return res.status(200).json({
                ok:true,
                mensaje: resultado.mensaje
            });

        }catch (error){
            console.log('Error al eliminar salón: ', error);
            return res.status(500).json({
                ok:false,
                error: 'Error interno al intentar eliminar el salón.'
            });
        }
    }

    crearSalon = async (req, res) => {
        try{
            // Extracción de datos enviados en el cuerpo del request.
            const datos = req.body;

            // Validación.
            if (!datos.titulo || !datos.capacidad){
                return res.status(400).json({
                    error: 'Faltan datos obligatorios.'
                });
            };

            // Llamada al servicio para crear el salón.
            const resultado = await this.SalonesServicio.crearSalon(datos);

            // Limpia cache luego de crear el salon nuevo.
            apicacheInstance.clear('/salones')

            // Retorna con exito y el 'ID' del salón creado.
            return res.status(201).json({
                ok: true,
                mensaje: 'Salón creado correctamente.',
                salon_id: resultado.salon_id
            });

        }catch (error){
            // Ultima linea de defensa para manejar cualquier error.
            console.log("Error en crearSalon (controlador): ", error);
            return res.status(500).json({
                ok:false,
                error: 'Error interno al crear el salón.'
            });
        }
    }
}