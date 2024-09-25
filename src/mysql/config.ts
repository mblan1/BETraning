import mysql from 'mysql';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'llanle2002',
    database: 'besprint',
});

const connectDatabase = () => {
    con.connect((err) => {
        if (err) throw err;
        console.log('Connected to the database');
    });
};

export { connectDatabase, con };
