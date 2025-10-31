import express from 'express';
import ServiciosControlador from '../../controladores/serviciosControlador.js'
import { validarCampos } from '../../middlewares/validarCampos.js';
import { cache } from '../../middlewares/apicache.js'
import { check } from 'express-validator';
import autorizarUsuario from "../../middlewares/autorizarUsuario.js"
import passport from 'passport';

// Instancia del controlador.
const serviciosControlador = new ServiciosControlador();
const router = express.Router();


// CRUD.

// Obtener todos los servicios.
router.get('/', 
    cache('5 minutos'),
    passport.authenticate('jwt', { session: false }),
    autorizarUsuario([1,2,3]),
    serviciosControlador.obtenerTodos
);

// Obtener servicio por ID.
router.get('/:servicio_id', 
    cache('5 minutos'),
    // passport.authenticate('jwt', { session: false }),
    autorizarUsuario([1,2]),
    serviciosControlador.buscarPorId
);


// Editar un servicio.
router.put('/:servicio_id',
    passport.authenticate('jwt', { session: false }), 
    autorizarUsuario([1,2]),
    serviciosControlador.editarServicioPorId
);


// Eliminar (borrado lógico) un servicio.
router.delete('/:servicio_id',
    passport.authenticate('jwt', { session: false }), 
    autorizarUsuario([1,2]),
    serviciosControlador.eliminarServicioPorId
);

// Crear servicio
router.post('/', 
    passport.authenticate('jwt', { session: false }), 
    autorizarUsuario([1,2]),
    [
        check('descripcion', 'La descripción es obligatoria.').notEmpty(),

        check('importe', 'El importe es obligatorio.').notEmpty(),
        check('importe', 'El importe debe ser un número mayor o igual a 0.').isInt({ min: 0}),
        validarCampos
    ],
    serviciosControlador.crearServicio
)


export { router };