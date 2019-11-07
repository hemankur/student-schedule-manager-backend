import express = require('express');

let app = module.exports = express();
let db = require('../../api/database.ts');


let cors = require('cors');
app.use(cors());

/**
 * GET request for users table
 */
app.get('/api/users/', (req, res) => {
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

/**
 * Post request to login a user
 */
app.post('/api/user/login/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username);
    console.log(password);
    let sql = 'select * from users where username = ?';
    let params = [username];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        } else if (row) {
            console.log(row);
            let pass = row.password;
            if (pass === password) {
                res.json({
                    message: 'success'
                });
            } else {
                res.status(400).json({
                    error: 'failure',
                });
            }
        } else {
            res.status(400).json({
                error: 'failure'
            });
        }
    });
});
