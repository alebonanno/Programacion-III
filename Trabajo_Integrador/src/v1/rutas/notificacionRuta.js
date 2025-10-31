import express from 'express'
// Módulo que importa la clase encargada de manejar notificaciónes.
import NotificacionServicio from '../../servicios/notificacionServicio.js'

// Creación de instancia de la clase 'NotificacionServicio', necesario para usar sus metodos.
const servicio = new NotificacionServicio;

// router => Es un objeto que permite definir rutas independientes.
// Luego puede ser montado en la app principal de 'Express'.
const router = express.Router();

// Define una ruta 'POST' en la ruta raiz '/' del router
// Cuando se haga un 'POST' a esa ruta, se ejecuta el metódo 'enviarNotificacion' del servicio.
router.post('/', servicio.enviarNotificacion);

// Permite que otro archivo lo importe y use para montar las rutas.
export { router };