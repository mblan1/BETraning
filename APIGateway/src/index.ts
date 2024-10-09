import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
// Load environment variables from .env file
dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
});

import express from 'express';
import routes from './routes';
import swagger from './config/swagger';

// initialize
const app = express();
app.use(cors());
swagger(app);
routes(app);

app.listen(process.env.GATEWAY_PORT, () => {
    console.log(`'Server is running on port ${process.env.GATEWAY_PORT}`);
});
