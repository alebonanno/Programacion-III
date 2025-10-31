import Servicios from "../db/servicios.js";

// Creación del servicio que usara el metodo de buscar todos los salones.
export default class SalonesServicio {

    constructor(){
        // Instancia de 'Servicios' en 'db'.
        this.servicios = new Servicios();
    }

    // Metodo para ser utilizado por el controlador luego.
    obtenerTodos = async () => {
        // usa el metodo 'buscarTodos()', que está en 'Servicios' de 'db'.
        return await this.servicios.buscarTodos();
    }

    // Necesita el id del servicio por parametro.
    buscarPorId = async (id) => {
        // Usa el metodo'buscarPorId()', que está en 'Servicios' de 'db'.
        return await this.servicios.buscarPorId(id);
    }

    // Necesita el id del servicio por parametro.
    editarPorId = async (id, datos) => {
        // Verifica si el servicio existe.
        const servicio = await this.servicios.buscarPorId(id);

        // Esto se manda a serviciosControlador.
        if (!servicio){
            return {
                ok:false,
                error: 'El servicio no existe o está inactivo (editarPorId => Servicio)'
            };
        };

        // Se realiza el update.
        const resultado = await this.servicios.editarServicioPorId(id, datos);
        // Retorna la actualización.
        return resultado;
    }

    // Necesita el id del salon por parametro.
    eliminarPorId = async (id) => {

        // Verificación de si existe.
        const servicio = await this.servicios.buscarPorId(id);

        if (!servicio) {
            return {
                ok: false,
                error: 'El servicio no existe o ya está inactivo.'
            };
        };

        // Llama al modelo/servicio para el borrado logico.
        // Mensaje pasa por aqui, va a 'mensaje: resultado.mensaje' del controlador.
        return await this.servicios.eliminarPorId(id);
    };

    // Creación del servicio.
    crearServicio = async (datos) => {
        try{
            // Llama al método de la clase 'Servicios' (db), que realmente hace el INSERT.
            const resultado = await this.servicios.crearServicio(datos);
            // Retorna el resultado para el controlador.
            return resultado;

        }catch (error){
            console.log("Error en crearServicio (Servicio): ", error);
            // throw => Si hubo un error aqui, no lo maneja, lo pasa para que lo maneje quien llamo la función.
            // Manda el error a 'controlador'.
            throw error;
        }
    };


}