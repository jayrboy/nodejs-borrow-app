import express from 'express';
import { register, login } from '../controllers/auth-controller.js';

const router = express.Router();

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

export default router;
