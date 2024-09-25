import productRoute from './product';
import { Express } from 'express';

const route = (app: Express) => {
    app.use('/product', productRoute);

    app.get('/', (req, res) => {
        res.send('Hello World');
    });
};

export default route;
