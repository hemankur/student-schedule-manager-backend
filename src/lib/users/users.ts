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
 * GET request that returns courses taken by the student
 */
app.get('/api/users/:username/', (req, res) => {
    let sql = 'select * from courses where courseID in (select courseID from registered where registered.sid = ?)';
    let params = [req.params.username];
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
 * GET request for users preferences
 */
app.get('/api/users/preferences/:username/', (req, res) => {
    let sql = 'select preferences from users where username = ?';
    let params = [req.params.username];
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
 * POST request for users preferences
 */
app.post('/api/users/preferences/', (req, res) => {
    let sql = 'update users set preferences = ? where username = ?';
    let params = [JSON.stringify(req.body.preferences), req.body.username];
    db.run(sql, params, (err) => {
        if (err) {
            res.status(400).json({error: err.message});
        } else {
            res.json({
                message: 'success'
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
    let sql = 'select * from users where username = ?';
    let params = [username];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        } else if (row) {
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

/**
 * GET request that returns courses taken by the student
 */
app.get('/api/users/data/:username/', (req, res) => {
    let sql = 'select * from users where username = ?';
    let params = [req.params.username];
        db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({error: err.message});
        } else {
            res.json({
                message: 'success',
                data: row
            });
        }
    });
});
