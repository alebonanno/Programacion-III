import mysql from 'mysql2/promise';

// Se exporta la constante.
// Conexion a la db de Xampp.
export const conexion = await mysql.createConnection({
    host: 'localhost',
    user: 'reservas',
    database: 'reservas',
    password: 'DevIII2025'
});