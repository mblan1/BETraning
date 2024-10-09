import { Express } from 'express';
import jwtVerify from '../middleware/jwtVerify';
import routeRouter from './route.router';
import userRouter from './user.route';
import permissionRouter from './permission.route';

const routes = (app: Express) => {
    app.use('/permission', jwtVerify, permissionRouter);
    app.use('/user', userRouter);
    app.use('/route', jwtVerify, routeRouter);
    app.get('/', (req, res) => {
        res.send('Hello World from UserService /');
    });
};

export default routes;
