import path from 'path';
import { DataSource } from 'typeorm';

const appDataSource = new DataSource({
    type: 'mysql',
    port: process.env.SQL_PORT ? parseInt(process.env.SQL_PORT) : 3306,
    host: process.env.SQL_HOST,
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_PRODUCT_SERVICE_DB,
    synchronize: true,
    entities: [path.join(__dirname, '../models/*.ts')],
});

const appInitialize = () => {
    appDataSource
        .initialize()
        .then(() => {
            console.log(`Database connected to **${process.env.SQL_PRODUCT_SERVICE_DB}**`);
        })
        .catch((err) => {
            console.error(err);
        });
};

export { appDataSource, appInitialize };
