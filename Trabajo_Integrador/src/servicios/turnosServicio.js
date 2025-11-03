import Turnos from "../db/turnos.js"


export default class TurnosService {
    constructor() {
        this.turnos = new Turnos;
    }

    crearTurno = async (turno) => {
        return await this.turnos.crearTurno(turno);
    }

    editarTurno = async (turno_id, turno) => {
        return await this.turnos.editarTurno(turno_id, turno);
    }

    borrarTurno = async (turno_id) => {
        return await this.turnos.borrarTurno(turno_id);
    }

    obtenerTurnos = async () => {
        return await this.turnos.buscarTodosTurnos();
    }
}
