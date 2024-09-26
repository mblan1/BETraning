// src/index.ts
import express from 'express';

const app = express();
const PORT = 5050;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
