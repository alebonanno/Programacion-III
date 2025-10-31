import express from 'express';
import SalonesControlador from '../../controladores/salonesControlador.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
import { cache } from '../../middlewares/apicache.js'
import { check } from 'express-validator';
import autorizarUsuarios from "../../middlewares/autorizarUsuario.js"
import passport from 'passport'


// Instancia
const salonesControlador = new SalonesControlador();

// Definicio de rutas con express.
const router = express.Router();

// autorizarUsuarios([1,2]) => 1 - Admin => 2 - Empleados.
// Solo el admin y los empelados pueden hacer BREAD de los salones.

// Usa el controlador de salones, y el metodo 'buscar todos()'.
// cache => Por 5 minutos los salones quedaran cacheados en la memoria del server.
router.get('/', 
    cache('5 minutos'), 
    passport.authenticate('jwt', { session: false }),
    autorizarUsuarios([1,2,3]), 
    salonesControlador.buscarTodos
);

// Busqueda por 'ID' de salon.
router.get('/:salon_id', 
    cache('5 minutos'),
    passport.authenticate('jwt', { session: false }), 
    autorizarUsuarios([1,2]), 
    salonesControlador.buscarPorId
);

// Busca por 'ID' para editar el salón.
router.put('/:salon_id',
    passport.authenticate('jwt', { session: false }), 
    autorizarUsuarios([1,2]), 
    salonesControlador.editarSalonPorId
);

// Busca por 'ID' para hacer el 'borrado logico'.
router.delete('/:salon_id',
    passport.authenticate('jwt', { session: false }), 
    autorizarUsuarios([1,2]), 
    salonesControlador.eliminarSalonPorId
);

// Crea un salón.
router.post('/', autorizarUsuarios([1,2]),
    passport.authenticate('jwt', { session: false }), 
    autorizarUsuarios([1,2]), 
    // Uso de express validator.
    // notEmpty() => Verifica que el campo no este vacio.
    // isInt() => Verifica que el campo sea un entero positivo, mayor o igual a 1.
    // isFloat() => Verifica que el campo sea (decimal o entero), mayor o igual a 0.
    [
        check('titulo', 'El titulo es necesario.').notEmpty(),
        check('direccion', 'La dirección es necesaria.').notEmpty(),

        check('capacidad', 'La capacidad es necesaria.').notEmpty(),
        check('capacidad', 'La capacidad es necesaria.').isInt({ min: 1}),

        check('importe', 'El importe es necesario.').notEmpty(),
        check('importe', 'El importe es necesario.').isFloat({min: 0}),
        validarCampos
    ],

    salonesControlador.crearSalon);

export { router };