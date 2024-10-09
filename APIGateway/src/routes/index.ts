import { Express } from 'express';
import { productProxy, userProxy } from '../config/proxy';
import jwtVerify from '../middleware/jwtVerify';

const routes = (app: Express) => {
    app.use('/api/product', jwtVerify, productProxy);
    app.use('/api', userProxy);
    app.get('/', (req, res) => {
        res.send('API Gateway /');
    });
};

export default routes;
