import InformeServicio from '../servicios/informesServicio.js'
import Reservas from '../db/reservas.js';

const informeServicio = new InformeServicio();
const reservasModelo = new Reservas();

export const descargarReporte = async (req, res) => {
    const formato = req.query.formato || 'csv';

    try {
        // Aquí se obtienen los datos de la DB.
        const datosReporte = await reservasModelo.obtenerDatosReservas();
        console.log("Datos recibidos: ", datosReporte.length);

        if (!datosReporte || datosReporte.length === 0) {
            return res.status(404).json({
                error: 'No hay reservas para generar el reporte.'
            });
        }

        if (formato === 'csv') {
            const rutaCsv = await informeServicio.informeReservasCsv(datosReporte);
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="reservas.csv"');
            return res.send(rutaCsv);
        }

        if (formato === 'pdf') {
            const pdfBuffer = await informeServicio.informeReservasPdf(datosReporte);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="reservas.pdf"');
            return res.send(pdfBuffer);
        }

        return res.status(400).json({ error: 'Formato no soportado. Usa csv o pdf.' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error generando el reporte' });
    }
};
