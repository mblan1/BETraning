// dotenv configuration
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
});
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import { appInitialize } from './config/typeorm';

// initialize
const app = express();
app.use(cors());
routes(app);
appInitialize();

app.listen(process.env.PRODUCT_SERVICE_PORT, () => {
    console.log(`ProductService is running on port ${process.env.PRODUCT_SERVICE_PORT}`);
});
