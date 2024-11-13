import 'dotenv/config';
import express from 'express';
import os from 'os';
import morgan from 'morgan';
import cors from 'cors';

import auth from './routes/auth.js';
import users from './routes/users.js';

const app = express();
const port = 8000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send(`<h1>${os.hostname()}</h1>`);
});

app.use('/api', auth);

app.use('/api/users', users);

app.listen(port, () =>
  console.log('Server running at http://localhost:%s', port)
);
