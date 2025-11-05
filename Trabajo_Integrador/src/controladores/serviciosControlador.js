import servicioServicios from '../servicios/serviciosServicio.js'
import { apicacheInstance } from '../middlewares/apicache.js';

export default class ServiciosControlador {
    constructor() {
        this.servicio = new servicioServicios();
    }

    obtenerTodos = async (req, res) => {
        try {

            const servicios = await this.servicio.obtenerTodos();

            res.status(200).json({
                'ok': true,
                'servicios': servicios
            });

        } catch (error) {
            console.log('Error en GET /salones', error);
            res.status(500).json({
                'ok': false,
                mensaje: 'Error al obtener servicios (controlador).'
            });
        }
    };

    buscarPorId = async (req, res) => {
        try {
            // Extrae el 'ID' de los parámetros de la URL.
            const { servicio_id } = req.params;
            const servicio = await this.servicio.buscarPorId(servicio_id);

            if (!servicio) {
                // Si en 'db' es null o algun error, responde 404 aqui en controlador.
                // Esto se muestra en 'bruno'.
                return res.status(404).json({
                    ok: false,
                    mensaje: 'Servicio no encontrado.'
                });
            }

            // Respuesta exitosa.
            res.status(200).json({
                'ok': true,
                'servicio': servicio
            });
        } catch (error) {
            console.log("Error en GET /servicios(:servicio_id: ", error);
            res.status(404).json({
                'ok': false,
                mensaje: 'Servicio no encontrado.'
            });
        }
    };

    // POST /servicios, crear servicio.
    crearServicio = async (req, res) => {
        try {
            const nuevoServicio = await this.servicio.crearServicio(req.body);
            res.status(201).json({
                'ok': true,
                'servicio': nuevoServicio
            });
        } catch (error) {
            res.status(500).json({
                'ok': false,
                'message': 'Error al crear el servicio'
            });
        }
    };

    editarServicioPorId = async (req, res) => {
        try {
            const { servicio_id } = req.params;
            const servicioActualizado = await this.servicio.editarPorId(servicio_id, req.body)

            if (!servicioActualizado) {
                return res.status(404).json({
                    'ok': false,
                    'message': servicioActualizado.error || 'Servicios no encontrado.'
                });
            };


            // Limpia el caché.
            apicacheInstance.clear('/servicios');
            apicacheInstance.clear(`/servicios/${servicio_id}`);

            // Return exitoso.
            return res.status(200).json({
                ok: true,
                mensaje: 'Servicio actualizado correctamente.'
            });

        } catch (error) {
            console.log('Error en editarServicioPoId(Controlador): ', error);
            return res.status(500).json({
                ok: false,
                error: 'Ocurrio un error al intentar actualizar el servicio.'
            });
        };
    };


    eliminarServicioPorId = async (req, res) => {
        try {
            const { servicio_id } = req.params;
            const eliminado = await this.servicio.eliminarPorId(servicio_id)

            if (!eliminado) {
                return res.status(404).json({
                    'ok': false,
                    'message': eliminado.error || 'Servicio no encontrado.'
                });
            };


            // Limpia el caché.
            apicacheInstance.clear('/servicios');
            apicacheInstance.clear(`/servicios/${servicio_id}`);

            // Return exitoso.
            return res.status(200).json({
                ok: true,
                mensaje: 'Servicio eliminado correctamente.'
            });

        } catch (error) {
            console.log('Error en editarServicioPoId(Controlador): ', error);
            return res.status(500).json({
                ok: false,
                error: 'Ocurrio un error al intentar eliminar el servicio.'
            });
        };
    };

};