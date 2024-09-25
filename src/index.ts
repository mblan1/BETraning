// src/index.ts
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './mysql/config';
import route from './routes';

const app = express();
const PORT = 5050;

app.use(cors());

// connect database
connectDatabase();
route(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
