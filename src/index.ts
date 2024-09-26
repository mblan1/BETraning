import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDatabase } from './mysql/config';
import route from './routes';
import swagger from './utils/swagger';

const app = express();
const PORT = parseInt(process.env.PORT || '5050');

app.use(cors());

// connect database
connectDatabase();
swagger(app, PORT);
route(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
