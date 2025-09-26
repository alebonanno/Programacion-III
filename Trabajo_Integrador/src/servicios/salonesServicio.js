import Salones from "../db/salones.js";

// Creación del servicio que usara el metodo de buscar todos los salones.
export default class SalonesServicio {

    constructor(){
        // Instancia de 'Salones' en 'db'.
        this.salones = new Salones();
    }

    // Metodo para ser utilizado por el controlador luego.
    buscarTodos = async () => {
        // usa el metodo 'buscarTodos()', que está en 'Salones' de 'db'.
        return await this.salones.buscarTodos();
    }

    // Necesita el id del salon por parametro.
    buscarPorId = async (id) => {
        // Usa el metodo'buscarPorId()', que está en 'Salones' de 'db'.
        return await this.salones.buscarPorId(id);
    }
}