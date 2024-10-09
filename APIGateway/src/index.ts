import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
});

import express from 'express';

// initialize
import routes from './routes';
const app = express();
routes(app);

app.listen(process.env.GATEWAY_PORT, () => {
    console.log(`'Server is running on port ${process.env.GATEWAY_PORT}`);
});
