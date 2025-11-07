import express from 'express';
import autorizarUsuarios from "../../middlewares/autorizarUsuario.js"
import passport from 'passport';
import { descargarReporte } from '../../controladores/informeControlador.js';

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Informe
 *   description: Visor de informes CSV y PDF.
 */

/**
 * @swagger
 * /api/v1/reporte:
 *   get:
 *     summary: Descargar informe de reservas
 *     description: Genera un informe de reservas en formato CSV o PDF. Solo usuarios autorizados.
 *     tags:
 *       - Informe
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: formato
 *         schema:
 *           type: string
 *           enum: [csv, pdf]
 *           default: csv
 *         required: false
 *         description: Formato de salida del informe. Puede ser 'csv' o 'pdf'. Por defecto 'csv'.
 * 
 *     responses:
 *       200:
 *         description: Informe generado correctamente.
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *               example: "Fecha reserva, Salón, Turno, Cumpleañero, Importe total, Activo\n2025-10-08,Salon 1,1,Juan,150000,true"
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *               example: "<PDF bytes>"
 *       400:
 *         description: Formato no soportado. Debe ser 'csv' o 'pdf'.
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: No hay reservas para generar el reporte.
 *       500:
 *         description: Error interno del servidor al generar el informe.
 */
// Ruta para descargar el informe en CSV o PDF.
router.get('/', 
    passport.authenticate("jwt", { session: false }), 
    autorizarUsuarios([1]), 
    descargarReporte
);

export default router;