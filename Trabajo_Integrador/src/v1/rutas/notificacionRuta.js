import express from 'express'
import { enviarNotificacion } from '../../controladores/notificacionControlador.js'

const router = express.Router();

router.post('/', enviarNotificacion);

export { router };