import ReservasServicio from "../servicios/reservasServicios.js";

export default class ReservasControlador{

    constructor(){
        // Crea una instancia del servicio de reservas 'ReservasServicio'.
        this.reservasServicio = new ReservasServicio();
    }

    // Extrae del cuerpo de la petición los datos de la reserva.
    // Llama al servicio, para crear la reserva, si falla da 'estado 404' y mensaje.
    // Si es exitoso => devuelve 'JSON' con nueva reserva y mensaje de exito.
    crear = async (req, res) => {
        try {
            
            const {
                fecha_reserva,
                salon_id,
                usuario_id,
                turno_id,
                foto_cumpleaniero, 
                tematica,
                importe_salon,
                importe_total,
                servicios } = req.body;

            const reserva = {
                fecha_reserva,
                salon_id,
                usuario_id,
                turno_id,
                foto_cumpleaniero, 
                tematica,
                importe_salon,
                importe_total, 
                servicios
            };

            const nuevaReserva = await this.reservasServicio.crear(reserva)

            if (!nuevaReserva) {
                return res.status(404).json({
                    estado: false,
                    mensaje: 'Reserva no creada'
                })
            }

            res.status(201).json({
                estado: true, 
                mensaje: 'Reserva creada!',
                salon: nuevaReserva
            });
    
        } catch (error) {
            console.log('Error en POST /reservas/', error);
            // Devuelve error 500 si falla.
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor (Controlador).'
            });
        }
    }
    
    // Llama al servicio para obtener todas la reserva activas.
    // Devuelve un 'JSON' con todas las reservas encontradas.
    buscarTodos = async (req, res) => {
        try {
            const reservas = await this.reservasServicio.buscarTodos();

            res.json({
                estado: true, 
                datos: reservas
            });
    
        } catch (error) {
            console.log('Error en GET /reservas', error);
            // Devuelve error 500 si falla.
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor (Controlador).'
            });
        }
    }

    // Busca al reserva especifica por su 'ID'.
    buscarPorId = async (req, res) => {
        try {
            // Obtiene el parámetro 'reserva_id' de la URL.
            // Ej: El cliente hace una petición a '/reservas/15' => req.params.reserva_id será "15".
            const reserva_id = req.params.reserva_id;
            // Busca la reserva especifica por su 'ID' usando el servicio.
            // Llama al metodo del servicio 'buscarPorId' pasandole el ID obtenido de la 'URL'.
            // Ese metodo hace consultas a la base de datos para buscar la reserva que tenga ese 'reserva_id'.
            const reserva = await this.reservasServicio.buscarPorId(reserva_id);

            if (!reserva) {
                // Si no encuentra la reserva responde error 404.
                return res.status(404).json({
                    estado: false,
                    mensaje: 'Reserva no encontrada.'
                })
            }

            // Si la encuentra responde con la 'reserva'.
            res.json({
                estado: true, 
                reserva: reserva
            });
    
        } catch (error) {
            console.log('Error en GET /reservas/reservas_id', error);
            // Si algo falla da error 500.
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor (Controlador).'
            });
        }
    }
}