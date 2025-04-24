const express = require('express');
const app = express();
const { Pool } = require('pg');

const PORT = process.env.PORT || 3000;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});


app.get('/api/random', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM citations ORDER BY RANDOM() LIMIT 1');
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/version', (req, res) => {
    res.json({ version: '1.0.0' });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});