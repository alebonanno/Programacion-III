import express from 'express';
import passport from 'passport';
import morgan from "morgan";
import fs from "fs";
import { estrategia, validacion } from "./config/passport.js";

// Importe de rutas.
import { router as v1SalonesRutas } from './v1/rutas/salonesRutas.js'
import { router as v1ServiciosRutas } from '../src/v1/rutas/serviciosRutas.js'
import { router as v1notificacionRouter } from './v1/rutas/notificacionRuta.js'
import { router as v1reservasRutas } from './v1/rutas/reservasRutas.js'
import { router as v1AuthRouter } from './v1/rutas/authRutas.js';
import { swaggerDocs } from './config/swagger.js';
import reporteRoutes from './v1/rutas/reporteRoutes.js'
import usuarioRoutes from './v1/rutas/usuariosRutas.js'
import turnoRoutes from './v1/rutas/turnosRoutes.js';
import { router as adminRouters } from './v1/rutas/adminRouters.js'

// Instancia de express.
const app = express()

// Las solicitudes con un body se interpretan como JSON.
app.use(express.json());

// Configuración de passport
// Es localStrategy.
passport.use(estrategia);
// Es validación del token.
passport.use(validacion);
app.use(passport.initialize());

// Morgan
let log = fs.createWriteStream("./access.log", { flags: "a" })
// Muestra en consola.
app.use(morgan("combined"))
app.use(morgan("combined", { stream: log }))


// Que use las rutas que se le pasen.
// '/api' => se pone por convencion.
// '/v1 => es al version 1, tambien debe ponerse en 'bruno' manualmente.
// Esta sola ruta, maneja CRUD => BREAD.
app.use('/api/v1/salones', passport.authenticate( "jwt", { session:false }), v1SalonesRutas);
app.use('/api/v1/servicios', v1ServiciosRutas);
// Esta ruta ahora requiere autenticación en bruno.
app.use('/api/v1/reservas', passport.authenticate( "jwt", { session:false }), v1reservasRutas);
// Autenticación.
app.use('/api/v1/auth', v1AuthRouter);
//Descargar informe.
app.use('/api/v1/reporte', reporteRoutes);
// Usuarios CRUD => Dentro estan todos los metodos HTTP.
app.use('/api/v1/usuarios', usuarioRoutes);
// Turnos CRUD
app.use('/api/v1/turnos', turnoRoutes);
// SOC
app.use('/api/v1/logs', adminRouters);


// Conecta swagger antes de iniciar el servidor.
swaggerDocs(app)

app.use('/api/v1/notificaciones', v1notificacionRouter);
export default app;