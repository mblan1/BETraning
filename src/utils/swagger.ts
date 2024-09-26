import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const options: swaggerJsDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product Detail API',
            version: '1.0.0',
            description: 'A simple Express Library API',
        },
        servers: [
            {
                url: process.env.SERVER,
            },
        ],
    },
    apis: ['src/controllers/*.ts', 'src/routes/*.ts', 'src/schemas/*.ts'],
};

const specs = swaggerJsDoc(options);

const swagger = (app: Express, port: number) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    console.log(`Swagger is running on http://localhost:${port}/api-docs`);
};

export default swagger;
