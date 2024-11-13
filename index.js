import 'dotenv/config';
import express from 'express';
import os from 'os';
import fs from 'fs';
import morgan from 'morgan';
import cors from 'cors';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = 8000;

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Borrow App - API Documentation',
      version: '1.0.11',
      description:
        'Swagger Tools - [Swagger Editor](https://editor.swagger.io/?_gl=1*mogv8*_gcl_au*MzA2ODUyMTczLjE3MTQzOTk2MTA.&_ga=2.177703841.582691157.1717503507-1575908821.1714399610)',
    },
    servers: [
      {
        url: process.env.SERVER_URL || 'http://localhost:8000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'], // ระบุ path ไปยังไฟล์ที่มี API documentation
};
const swagger = swaggerJsdoc(options);

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV != 'production') {
  app.use(morgan('dev'));
  app.get('/', (req, res) => res.redirect('api-docs'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));
} else {
  app.get('/', (req, res) => {
    res.status(200).send(`<h1>${os.hostname()}</h1>`);
  });
}

/* --- API Endpoints --- */
const files = fs.readdirSync('./routes');
for (const file of files) {
  let fs = await import(`./routes/${file}`);
  app.use('/api', fs.default);
}

app.listen(port, () =>
  console.log('Server running at http://localhost:%s', port)
);
