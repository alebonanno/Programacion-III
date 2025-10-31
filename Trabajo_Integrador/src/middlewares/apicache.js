import apicache from 'apicache';

// Instancia de caché.
const apicacheInstance = apicache.newInstance();
// Obtiene el middleware de caché, para usar en rutas.
const cache = apicacheInstance.middleware;

// Exporta caché para usarlo en rutas, y la instancia de apicache en caso de necesitar otras funciones.
export { cache, apicacheInstance };