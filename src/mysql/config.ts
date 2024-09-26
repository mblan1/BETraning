import mysql from 'mysql';

const con = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
});

const connectDatabase = () => {
    con.connect((err) => {
        if (err) throw err;
        console.log('Connected to the database');
    });
};

export { connectDatabase, con };
