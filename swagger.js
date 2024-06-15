// backend/swagger.js

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { version } = require('./package.json');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API Documentation',
      version,
      description: 'This is the API documentation for the User service',
    },
    servers: [
      {
        url: 'http://localhost:8000/api',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;
