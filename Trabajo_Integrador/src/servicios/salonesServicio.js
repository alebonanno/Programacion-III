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

    // Necesita el id del salon por parametro.
    editarPorId = async (id, datos) => {
        // Verifica si el salón existe y/o esta activo.
        const salon = await this.salones.buscarPorId(id);

        // Esto se manda a salonesControlador.
        if (!salon){
            return {
                ok:false,
                error: 'El salón no existe o está inactivo (editarPorId => Servicio)'
            };
        };

        // Se realiza el update.
        const resultado = await this.salones.editarSalonPorId(id, datos);
        // Retorna la actualización.
        return resultado;
    }

    // Necesita el id del salon por parametro.
    eliminarPorId = async (id) => {

        // Verificación de si existe.
        const salon = await this.salones.buscarPorId(id);

        if (!salon) {
            return {
                ok: false,
                error: 'El salón no existe o ya está inactivo.'
            };
        };

        // Llama al modelo/salón para el borrado logico.
        // Mensaje pasa por aqui, va a 'mensaje: resultado.mensaje' del controlador.
        return await this.salones.eliminarPorId(id);
    };

    // Creación del salón.
    crearSalon = async (datos) => {
        try{
            // Llama al método de la clase 'Salones' (db), que realmente hace el INSERT.
            const resultado = await this.salones.crearSalon(datos);
            // Retorna el resultado para el controlador.
            return resultado;

        }catch (error){
            console.log("Error en crearSalon (Servicio): ", error);
            // throw => Si hubo un error aqui, no lo maneja, lo pasa para que lo maneje quien llamo la función.
            // Manda el error a 'controlador'.
            throw error;
        }
    };


}