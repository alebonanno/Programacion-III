import app from './reservas.js'
import dotenv from 'dotenv';

dotenv.config();

// Lanzo el server de express.
app.listen(process.env.PUERTO, () => {
    console.log(`Servidor arriba en el puerto ${process.env.PUERTO}`);
    console.log(`Documentación disponible en http://localhost:${process.env.PUERTO}/api-docs`);
});