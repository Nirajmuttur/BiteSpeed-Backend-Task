import swaggerJSDoc from "swagger-jsdoc";
import path from 'path';
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
    ],
}


const options = {
    swaggerDefinition,
    apis: [path.resolve(__dirname, './routes/*.ts')]
}

export const swaggerSpec = swaggerJSDoc(options)