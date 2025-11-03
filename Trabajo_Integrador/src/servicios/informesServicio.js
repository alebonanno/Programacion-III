import { createObjectCsvStringifier, createObjectCsvWriter } from 'csv-writer';
import puppeteer, { Browser } from "puppeteer";
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class InformeServicio {
    
    // Genera CSV en memoria y devuelve como string.
    informeReservasCsv = async (datosReporte) => {
        try{
            const csvStringifier = createObjectCsvStringifier({
                header: [
                    {id: 'fecha_reserva', title: 'Fecha reserva'},
                    {id: 'salon', title: 'salón'},
                    {id: 'turno', title: 'turno'},
                    {id: 'tematica', title: 'cumpleañero'},
                    {id: 'importe_total', title: 'importe total'},
                    {id: 'activo', title: 'activo'}
                ]
            });

            datosReporte.sort((a, b) => {
                if (a.fecha_reserva < b.fecha_reserva) return -1;
                if (a.fecha_reserva > b.fecha_reserva) return 1;

                if (a.salon < b.salon) return -1;
                if (a.salon > b.salon) return 1;

                return a.turno - b.turno;
            });

            const header = csvStringifier.getHeaderString();
            const records = csvStringifier.stringifyRecords(datosReporte);

            // Retorna todo el CSV como "string".
            return header + records

        }catch (error){
            console.log(`Error generando csv ${error}`);
        }
    }

    // Genera PDF en memoria y devuelve como string.
    informeReservasPdf = async (datosReporte) => {
        try{
            const plantillaPath  = path.join(__dirname, '../utiles/handlebars/informe.hbs');
            const plantillaHtml = fs.readFileSync(plantillaPath , 'utf8');
            
            const template = handlebars.compile(plantillaHtml);
            
            const htmlFinal = template(
                {
                    reservas: datosReporte
                }
            );
            
            const browser = await puppeteer.launch({
                headers: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            const page = await browser.newPage();
            await page.setContent(htmlFinal, { waitUntil: "networkidle0" });

            const buffer = await page.pdf({
                format: 'A4',
                printBackground: true
            });

            await browser.close();
            // Devuelve el PDF como buffer listo para enviar.
            return buffer;

        }catch(error){
            console.error('Error generando el PDF:', error);
            throw error;
        }
    }

}