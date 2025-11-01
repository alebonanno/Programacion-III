import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path'

const opciones = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de autenticación",
            version: "1.0.0",
            description: "Documentación de endpoints de autenticación."
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "jwt"
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: [path.join(process.cwd(), "./src/v1/rutas/*.js")]
};

const specs = swaggerJsDoc(opciones)
console.log(JSON.stringify(specs, null, 2));

export const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};