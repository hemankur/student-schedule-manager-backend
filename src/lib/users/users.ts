import express = require('express');

let app = module.exports = express();
let db = require('../../api/database.ts');


let cors = require('cors');
app.use(cors());

/**
 * GET request for users table
 */
app.get('/api/users/', (req, res) => {
    console.log('get users...');
    let sql = 'select * from users';
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({error: err.message});
        } else {
            res.json({
                message: 'success',
                data: rows
            });
        }
    });
});
