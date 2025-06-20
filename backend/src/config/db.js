import 'dotenv/config';

import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
    insertIdAsNumber: true, // Converts INSERT_ID (which can be BIGINT) to a Number
    bigIntAsNumber: true,  
});

async function getConnection() {
    let conn;
    try {
        conn = await pool.getConnection();
        return conn;
    } catch (err) {
        console.error('Error getting MariaDB connection:', err);
        throw err;
    }
}

export { getConnection, pool };