import { getConnection, pool } from "../config/db.js"

export async function getAllProduct( req, res) {
    let conn;
    try {
        // const { id } = req.params;
        conn = await getConnection();
        const rows = await conn.query('SELECT * FROM products');

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(rows[0]); // Return the first (and only) matching product
    } catch (err) {
        console.error('Error fetching product by ID:', err);
        res.status(500).json({ error: 'Failed to fetch product', details: err.message });
    } finally {
        if (conn) conn.release();
    }
}

export async function getProduct( req, res) {
   let conn;
    try {
        const { id } = req.params;
        conn = await getConnection();
        const rows = await conn.query('SELECT * FROM products WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(rows[0]); // Return the first (and only) matching product
    } catch (err) {
        console.error('Error fetching product by ID:', err);
        res.status(500).json({ error: 'Failed to fetch product', details: err.message });
    } finally {
        if (conn) conn.release();
    }
}


export async function createProduct( req, res) {
    let conn;
    try {
        const { name, description, price, stock_quantity } = req.body;

        // Basic validation
        if (!name || !price || price < 0 || stock_quantity === undefined || stock_quantity < 0) {
            return res.status(400).json({ error: 'Name and a valid price/stock_quantity are required.' });
        }

        conn = await getConnection();
        const query = 'INSERT INTO products (name, description, price, stock_quantity) VALUES (?, ?, ?, ?)';
        const result = await conn.query(query, [name, description, price, stock_quantity]);

        res.status(201).json({
            message: 'Product added successfully',
            productId: result.insertId,
            product: { id: result.insertId, name, description, price, stock_quantity }
        });
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ error: 'Failed to add product', details: err.message });
    } finally {
        if (conn) conn.release(); // Always release the connection
    }
}


export async function updateProduct( req, res) {
    let conn;
    try {
        const { id } = req.params;
        const { name, description, price, stock_quantity } = req.body;

        // Ensure at least one field is provided for update
        if (!name && !description && price === undefined && stock_quantity === undefined) {
            return res.status(400).json({ error: 'At least one field (name, description, price, stock_quantity) is required for update.' });
        }

        // Build the update query dynamically
        const updates = [];
        const values = [];

        if (name !== undefined) {
            updates.push('name = ?');
            values.push(name);
        }
        if (description !== undefined) {
            updates.push('description = ?');
            values.push(description);
        }
        if (price !== undefined) {
            if (price < 0) return res.status(400).json({ error: 'Price cannot be negative.' });
            updates.push('price = ?');
            values.push(price);
        }
        if (stock_quantity !== undefined) {
             if (stock_quantity < 0) return res.status(400).json({ error: 'Stock quantity cannot be negative.' });
            updates.push('stock_quantity = ?');
            values.push(stock_quantity);
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'No valid fields provided for update.' });
        }

        values.push(id); // Add the ID at the end for the WHERE clause

        conn = await getConnection();
        const query = `UPDATE products SET ${updates.join(', ')} WHERE id = ?`;
        const result = await conn.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found or no changes made' });
        }

        res.status(200).json({ message: 'Product updated successfully' });
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Failed to update product', details: err.message });
    } finally {
        if (conn) conn.release();
    }
}


export async function deleteProduct( req, res) {
  let conn;
    try {
        const { id } = req.params;
        conn = await getConnection();
        const result = await conn.query('DELETE FROM products WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Failed to delete product', details: err.message });
    } finally {
        if (conn) conn.release();
    }
}