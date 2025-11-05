import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo access.log.
const logPath = path.join(__dirname, '../../access.log');

// Función para normalizar IPs locales => (::1 o ::ffff:127.0.0.1) a 'localhost'.
// Facilita identificar tráfico interno.
const normalizeIp = ip => {
  if (ip === '::1' || ip === '::ffff:127.0.0.1') return 'localhost';
  return ip;
};

const getLogStats = (req, res) => {
    // Lee el archivo 'access.log' de manera asincrona.
  fs.readFile(logPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error leyendo log:', err.message);
      return res.status(500).send('No se pudo leer el log');
    }

    // Separa cada linea del log.
    const lines = data.trim().split('\n');
    // Un objeto para acumular datos por IP.
    const actividad = {};

    lines.forEach(line => {
      // Suponiendo formato: IP - - [fecha] "METODO RUTA" código.
      // Captura la IP.
      const ipMatch = line.match(/^(\S+)/);
      // Captura método y ruta.
      const methodRouteMatch = line.match(/"(\S+)\s(\S+)/);
      // Si no coincide el formato, salta la linea.
      if (!ipMatch || !methodRouteMatch) return;

      const ip = normalizeIp(ipMatch[1]);
      const method = methodRouteMatch[1];
      // Decodifica URL.
      const route = decodeURIComponent(methodRouteMatch[2]);

      // Ignorar rutas internas como Swagger.
      if (route.startsWith('/api-docs')) return;

      // Inicializa objeto de actividad para la IP si no existe.
      if (!actividad[ip]) actividad[ip] = { total: 0, métodos: {}, rutas: {} };

      // Contabiliza totales.
      actividad[ip].total += 1;
      actividad[ip].métodos[method] = (actividad[ip].métodos[method] || 0) + 1;
      actividad[ip].rutas[route] = (actividad[ip].rutas[route] || 0) + 1;
    });

    // Convertir el objeto actividad a array y ordenar por total de solicitudes.
    // Se limita a las 5 rutas mas solicitadas por IP.
    const ranking = Object.entries(actividad)
    // Orden descendente por total.
      .sort((a, b) => b[1].total - a[1].total)
      .map(([ip, stats]) => {
        const topRutas = Object.entries(stats.rutas)
          .sort((a, b) => b[1] - a[1])
          // Toma las 5 rutas más usadas.
          .slice(0, 5);
        return {
          ip,
          total: stats.total,
          métodos: stats.métodos,
          // Convierte array a objetos.
          rutas: Object.fromEntries(topRutas)
        };
      });

      // Devuelve el ranking en formato JSON.
    res.json(ranking);
  });
};

export { getLogStats };
