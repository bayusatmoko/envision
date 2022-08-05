import express from 'express';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import cors from 'cors';

import userRoutes from './src/routes/users';
import errorHandler from './src/middleware/errorHandler';

dotenv.config();
require('./src/config/sequelize');
require('./src/scheduler')

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use(errorHandler);

module.exports = app;
