import { validationResult } from 'express-validator';


// Esto valida desde 'rutas'.
export const validarCampos = (req, res, next) => {
    const errores = validationResult(req);

    // Verifica si 'errores' no esta vacio.
    // isEmpty => Devuelve True si no hay errores, pero como '!' lo invierte.
    // El 'if' entra si hay errores de validación.
    if (!errores.isEmpty()){
        return res.status(400).json({
            estado: 'Falla',
            // Convierte los errores en algo legible.
            // Muestra donde esta el error, si en email o password por ejemplo.
            // mapped() => transforma errores de valicación en un objeto organizado por nombre del campo.
            mensaje: errores.mapped()
        })
    }
    // Indica que siga el flujo normal si no hay errores, que siga a controladores, por ejemplo.
    // Si no se usara 'next()' la petición queda detenida en este middleware.
    next();
}