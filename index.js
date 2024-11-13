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
