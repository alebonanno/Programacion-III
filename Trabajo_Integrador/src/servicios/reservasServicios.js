import Reservas from "../db/reservas.js"
import ReservaService from "../db/reservaServicios.js"
import NotificacionesServicios from "../servicios/notificacionServicio.js"

export default class ReservasServicios {

    // Se crean según los importes de arriba.
    constructor() {
        this.reserva = new Reservas();
        this.reservas_servicios = new ReservaService();
        this.notificaciones_servicios = new NotificacionesServicios();
    }

    // Obtiene las reservas desde la base de datos.
    buscarTodos = () => {
        return this.reserva.buscarTodos();
    };

    // Obtiene una reserva especifica por ID.
    buscarPorId = (reserva_id) => {
        return this.reserva.buscarPorId(reserva_id)
    };

    // Desestrucra el objeto 'reserva' que se pasa como argumento.
    // Extrae directamente propiedades especificas del objeto para usarlas facilmente dentro del metodo.
    crear = async (reserva) => {
        const {
            fecha_reserva,
            salon_id,
            usuario_id,
            turno_id,
            foto_cumpleaniero,
            tematica,
            importe_salon,
            servicios } = reserva;

        // Calcular el importe total => (salon + servicios).
        // 'importe_total' en vez de estar en 'crear' se usa aqui para calcular.
        const importeSalon = parseFloat(importe_salon) || 0;
        const importeServicios = (servicios || []).reduce((total, servicio) => {
            return total + (parseFloat(servicio.importe) || 0);
        }, 0);
        const importe_total = importeSalon + importeServicios;


        // Se arma la nueva reserva con el total calculado.
        const nuevaReserva = {
            fecha_reserva,
            salon_id,
            usuario_id,
            turno_id,
            foto_cumpleaniero,
            tematica,
            importe_salon: importeSalon,
            importe_total
        };


        // Creación de solo la reserva.
        const result = await this.reserva.crear(nuevaReserva);

        if (!result) {
            return null;
        }

        // Creación de relaciones RESERVAS-SERVIDOR.
        await this.reservas_servicios.crear(result.reserva_id, servicios);

        // Busca los datos para la 'notificación', leyendo desde la 'DB'.
        const datosParaNotificar = await this.reserva.datosParaNotificar(result.reserva_id);

        // Envio de notificación.
        await this.notificaciones_servicios.enviarNotificacion(datosParaNotificar);

        // Retorno de reserva creada.
        return this.reserva.buscarPorId(result.reserva_id);
    };

    borrarReserva = async (reserva_id) => {
        // Opcional: validar que la reserva exista antes de borrar
        const reserva = await this.reserva.borrarReserva(reserva_id);
        if (!reserva) {
            return null;
        }
        return await this.reserva.borrarReserva(reserva_id);
    };


    // Editar una reserva.
    actualizarReserva = async (reserva_id, datos) => {
        try {
            const resultado = await this.reserva.actualizarReserva(reserva_id, datos);
            return resultado;
        } catch (error) {
            console.error("Error en actualizarReserva (servicio):", error);
            throw error;
        }
    };

}