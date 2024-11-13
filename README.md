## Application "ยืมเงิน" (Borrow App)

Tech Stack

1. Node.js
2. MongoDB

```sh
mkdir borrow-app
cd borrow-app

npm init --yes
touch index.js
npm install express nodemon cors morgan dotenv mongoose jsonwebtoken bcryptjs
```

## Setup Web Server & package.json

- create a folder name "routes"
- create a folder name "controllers"
- create a folder name "middleware"

```json
{
  "type": "module",
  "scripts": {
    "start": "nodemon index.js"
  }
}
```

```js
import 'dotenv/config';
import express from 'express';
import os from 'os';
import fs from 'fs';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send(`<h1>${os.hostname()}</h1>`);
});

/* --- API Endpoints --- */
const files = fs.readdirSync('./routes');
for (const file of files) {
  let fs = await import(`./routes/${file}`);
  app.use('/api', fs.default);
}

app.listen(port, () =>
  console.log('Server running at http://localhost:%s', port)
);
```

## Database Connection

- create a file name "models.js"
- create a file name ".env"

```.env
MONGODB_URL="mongodb://localhost/db1"
```

```js
import mongoose from 'mongoose';

// Database Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log(err));

// User Model
const userSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    name: String,
    money: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
export let User = mongoose.model('User', userSchema);
```

## Run App

```sh
npm start

[nodemon] restarting due to changes...
[nodemon] starting `node index.js`
MongoDB Connected!
Server running at http://localhost:8000
GET / 200 4.480 ms - 26
```

## API End-points

1. POST: /api/auth/register
2. POST: /api/auth/login
3. GET: /api/users
4. POST: /api/transaction-type
5. POST: /api/add/money
6. POST: /api/add/borrow
7. POST: /api/add/refund
8. GET: /api/dept-report/:id
9. GET: /api/transactions

## Swagger API Document

- Bearer Authorization

```sh
npm i swagger-jsdoc
npm i swagger-ui-express
```

## Swagger API Document - Setup

- index.js

```js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

/* --- API Spec --- */
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
```

## Swagger API Document - Endpoints

```js
/**
 * @swagger
 * /api/register:
 *  post:
 *      tags: [Authorization]
 *      summary: "Register"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              default: "admin"
 *                          password:
 *                              type: string
 *                              default: "1234"
 *                          name:
 *                              type: string
 *                              default: "A"
 *              example:
 *                  username: "admin"
 *                  password: "1234"
 *                  name: "A"
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "Register Success"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      example:
 *                          "username": "string"
 *                          "password": "string"
 *                          "name": "string"
 *          400:
 *              description: "User Already Exists!"
 */
router.post('/register', register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Authorization]
 *     summary: "User login"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: "Login Successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 payload:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "admin"
 *                     name:
 *                       type: string
 *                       example: "A"
 *                     money:
 *                       type: number
 *                       example: 1000
 *       400:
 *         description: "Password Invalid!!!"
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Password Invalid!!!"
 *       404:
 *         description: "User Not Found!!!"
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "User Not Found!!!"
 *       500:
 *         description: "Internal Server Error"
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Internal Server Error"
 */
router.post('/login', login);
```
