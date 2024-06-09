import swaggerJSDoc from "swagger-jsdoc";
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'BiteSpeed API Documentation',
        version: '1.0.0',
        description: 'Documentation for your API',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
        {
            url: 'https://bitespeed-backend-task-n27o.onrender.com',
            description: 'Production Server'
        }
    ],
}


const options = {
    swaggerDefinition,
    apis: ['swagger.yaml']
}

export const swaggerSpec = swaggerJSDoc(options)