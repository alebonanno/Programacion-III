import TurnosService from '../servicios/turnosServicio.js'
// Importe para usar la función de notificar al crear un turno.
import NotificacionServicio from '../servicios/notificacionServicio.js';


export default class TurnosController {
    constructor() {
        this.turnosService = new TurnosService();
        this.notificacionServicio = new NotificacionServicio();
    }

    // Obtener todos los turnos
    obtenerTurnos = async (req, res) => {
        try {
            const turnos = await this.turnosService.obtenerTurnos();
            res.status(200).json({
                ok: true,
                datos: turnos
            });
        } catch (error) {
            console.error("Error al obtener turnos (controlador)", error);
            res.status(500).json({
                mensaje: "Error al obtener turnos."
            });
        }
    }

    // Crea un turno
    crearTurno = async (req, res) => {
        try {
            const nuevoTurno = req.body;
            // Siempre acvito = 1, al crear.
            nuevoTurno.activo = 1;
            const turnoCreado = await this.turnosService.crearTurno(nuevoTurno);

            res.status(201).json({
                ok: true,
                mensaje: "Turno creado correctamente.",
                turno: turnoCreado
            });
        } catch (error) {
            console.error("Error al crear turno (controlador)", error);
            res.status(500).json({
                mensaje: "Error al crear turno."
            });
        }
    }

    // Editar un turno
    editarTurno = async (req, res) => {
        try {
            const turno_id = req.params.id;
            const turnoActualizado = req.body;
            const resultado = await this.turnosService.editarTurno(turno_id, turnoActualizado);

            res.status(200).json({
                ok: true,
                mensaje: "Turno actualizado correctamente.",
                turno: resultado
            });

        } catch (error) {
            console.error("Error al editar turno (controlador)", error);
            res.status(500).json({
                mensaje: "Error al editar turno."
            });
        }
    }

    // Borrado lógico => activo = 0.
    borrarTurno = async (req, res) => {
        try {
            const turno_id = req.params.id;
            await this.turnosService.borrarTurno(turno_id);
            res.status(200).json({
                ok: true,
                mensaje: "Turno eliminado correctamente (borrado lógico)."
            });
        } catch (error) {
            console.error("Error al borrar turno (controlador)", error);
            res.status(500).json({
                mensaje: "Error al borrar turno."
            });
        }
    }
}