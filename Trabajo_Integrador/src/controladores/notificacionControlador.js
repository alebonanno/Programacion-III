import { serve } from "swagger-ui-express";
import NotificacionServicio from "../servicios/notificacionServicio.js";
import { Result } from "express-validator";

const servicio = new NotificacionServicio();

export const enviarNotificacion = async (req, res) => {
    try {
        const resultado = await servicio.enviarNotificacion(req.body);

        if (resultado.ok) {
            res.status(200).json(resultado);
        }else {
            res.status(500).json(resultado);
        }
    }catch (error) {
        console.error("Error en el controlador de notifición", error);
        res.status(500).json({
            ok: false,
            mensaje: "Error interno del servidor",
            error: error.mensaje
        });
    };
};