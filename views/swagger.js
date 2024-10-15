import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { usuariosDocs } from '../src/swagger/usuarios.js';
import { reportesDocs } from '../src/swagger/reportes.js';
import { muestrasDocs } from '../src/swagger/muestras.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'COFFCO ',
      version: '1.0.0',
      description: 'Documentación de Coffco',
    },
     servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    paths: {
      ...reportesDocs,
      ...usuariosDocs,
      ...muestrasDocs,

    },
  },
  apis: ['./src/swagger/*.js'],
};

const specs = swaggerJsdoc(options);
const swaggerSetup = swaggerUi.setup(specs);

export { swaggerUi, swaggerSetup };
