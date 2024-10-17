import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { usuariosDocs } from '../src/swagger/usuarios.js';
import { reportesDocs } from '../src/swagger/reportes.js';
import { muestrasDocs } from '../src/swagger/muestras.js';
import { alquilerDocs } from '../src/swagger/alquiler.js';
import { ambienteDocs } from '../src/swagger/ambiente.js';
import { authDocs } from '../src/swagger/Auth.js';
import { documentosDocs } from '../src/swagger/documentos.js';
import { estadisticaDocs } from '../src/swagger/estadistica.js';
import { facturasDocs } from '../src/swagger/facturas.js';
import { fincasDocs } from '../src/swagger/finca.js';
import { ingresosDocs } from '../src/swagger/ingresos.js';
import { logosDocs } from '../src/swagger/logos.js';
import { municipioDocs } from '../src/swagger/municipio.js';
import { precioDocs } from '../src/swagger/precio.js';
import { recuperarContraseñaDocs } from '../src/swagger/recuperarContraseña.js';
import { rolDocs } from '../src/swagger/rol.js';
import { tipoDocumentoDocs } from '../src/swagger/tipoDocumento.js';
import { tiposervicioDocs } from '../src/swagger/tiposervicio.js';
import { valorDocs } from '../src/swagger/valor.js';
import { variablesDocs } from '../src/swagger/variables.js';
import { versionesDocs } from '../src/swagger/versiones.js';
import { serviciosDocs } from '../src/swagger/servicios.js';

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
      ...alquilerDocs,
      ...ambienteDocs,
      ...authDocs,
      ...documentosDocs,
      ...estadisticaDocs,
      ...facturasDocs,
      ...fincasDocs,
      ...ingresosDocs,
      ...logosDocs,
      ...municipioDocs,
      ...precioDocs,
      ...recuperarContraseñaDocs,
      ...rolDocs,
      ...tipoDocumentoDocs,
      ...tiposervicioDocs,
      ...valorDocs,
      ...variablesDocs,
      ...versionesDocs,
      ...serviciosDocs,

    },
  },
  apis: ['./src/swagger/*.js'],
};

const specs = swaggerJsdoc(options);
const swaggerSetup = swaggerUi.setup(specs);

export { swaggerUi, swaggerSetup };
