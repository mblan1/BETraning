import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Manager',
            version: '1.0.0',
            description: 'API Manager of user, product and router',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        servers: [
            {
                url: process.env.BASE_URL,
            },
        ],
    },
    apis: ['./src/swagger/*.ts'],
};

const specs = swaggerJsdoc(options);

const swagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    console.log(`Swagger is running on ${process.env.BASE_URL}/api-docs`);
};

export default swagger;
