import express from 'express'

const app = express()

app.get('/estado', (req, res) => {
    res.json({'ok':true});
    // Se ejecuta antes la linea '6'.
    // res.status(201).send({'estado': true, 'mensaje' : 'Reserva creada!'});
})

app.post('/notificacion', (req, res) => {
    console.log(req.body);
    res.json({'ok':true});
})

process.loadEnvFile();
console.log(process.env.PUERTO);

app.listen(process.env.PUERTO, () => {
    console.log(`Servidor arriba en ${process.env.PUERTO}`);
});