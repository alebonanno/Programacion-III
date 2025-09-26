import Salones from "../db/salones.js";
import SalonesServicio from "../servicios/salonesServicio.js";

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
}