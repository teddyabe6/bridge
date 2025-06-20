import { getConnection, pool } from "../config/db.js"



export async function createUser( req, res) {
   let conn;
    try {
        conn = await getConnection();
        console.log("all users found")
        // const rows = await conn.query('SELECT * FROM users');
        // res.json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    } finally {
        if (conn) conn.release();
    }
} 

export async function getAllUser( req, res) {
   let conn;
    try {
        conn = await getConnection();
        console.log("all users found")
        // const rows = await conn.query('SELECT * FROM users');
        // res.json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    } finally {
        if (conn) conn.release();
    }
} 

export async function getUser( req, res) {
   let conn;
    try {
        conn = await getConnection();
        console.log("all users found")
        // const rows = await conn.query('SELECT * FROM users');
        // res.json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    } finally {
        if (conn) conn.release();
    }
} 


export async function updateUser( req, res) {
   let conn;
    try {
        conn = await getConnection();
        console.log("all users found")
        // const rows = await conn.query('SELECT * FROM users');
        // res.json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    } finally {
        if (conn) conn.release();
    }
} 


export async function deleteUser( req, res) {
   let conn;
    try {
        conn = await getConnection();
        console.log("all users found")
        // const rows = await conn.query('SELECT * FROM users');
        // res.json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    } finally {
        if (conn) conn.release();
    }
} 