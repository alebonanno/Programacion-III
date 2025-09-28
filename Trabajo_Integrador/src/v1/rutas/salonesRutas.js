import express from 'express';
import SalonesControlador from '../../controladores/salonesControlador.js';

// Instancia
const salonesControlador = new SalonesControlador();

// Definicio de rutas con express.
const router = express.Router();

// Usa el controlador de salones, y el metodo 'buscar todos()'.
router.get('/', salonesControlador.buscarTodos);
// Busqueda por 'ID' de salon.
router.get('/:salon_id', salonesControlador.buscarPorId);
// Busca por 'ID' para editar el salón.
router.put('/:salon_id', salonesControlador.editarSalonPorId);
// Busca por 'ID' para hacer el 'borrado logico'.
router.delete('/:salon_id', salonesControlador.eliminarSalonPorId);
// router.post('/', salonesControlador.);

export { router };