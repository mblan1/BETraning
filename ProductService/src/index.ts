// dotenv configuration
import dotenv from 'dotenv';
import path = require('path');
dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
});
import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import { appInitialize } from './config/typeorm';

// initialize
const app = express();
routes(app);
appInitialize();

app.listen(process.env.PRODUCT_SERVICE_PORT, () => {
    console.log(`ProductService is running on port ${process.env.PRODUCT_SERVICE_PORT}`);
});
