const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'data_auto_core',
    password: '254327',
    port: 5432,
});



router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM master_data');
        res.render('setting', { title: 'Settings', data: result.rows });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

module.exports = router;
