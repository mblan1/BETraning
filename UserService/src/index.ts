import dotenv from 'dotenv';
import path from 'path';
// Load environment variables from .env file
dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
});

import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import { appInitialize } from './config/typeorm';

// initialize the app
const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

appInitialize();
routes(app);

app.listen(process.env.USER_SERVICE_PORT, () => {
    console.log(`userService is running on port ${process.env.USER_SERVICE_PORT}`);
});
