import { Express } from 'express';
import { getAllProductsController } from '../controllers/product.controller';
import userPermissionCheck from '../middleware/userPermissionCheck';

const routes = (app: Express) => {
    app.get('/getProducts', userPermissionCheck, getAllProductsController);
    app.get('/', (req, res) => {
        res.send('Hello World! This is ProductService');
    });
};

export default routes;
