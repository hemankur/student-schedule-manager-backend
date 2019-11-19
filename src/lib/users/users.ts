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

app.patch('/api/users/email/', (req, res) => {
    let sql = 'update users set email = ? where username = ?';
    let params = [req.body.data, req.body.username];

    db.run(sql, params, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                message: 'success'
            });
        }
    });
});


app.patch('/api/users/phone/', (req, res) => {
    let sql = 'update users set phone = ? where username = ?';
    let params = [req.body.data, req.body.username];

    db.run(sql, params, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                message: 'success'
            });
        }
    });
});


app.patch('/api/users/emergency/', (req, res) => {
    let sql = 'update users set emergencyName = ?, emergencyNumber = ? where username = ?';
    let params = [req.body.data.emergencyName, req.body.data.emergencyNumber, req.body.username];

    db.run(sql, params, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                message: 'success'
            });
        }
    });
});

app.patch('/api/users/address/', (req, res) => {
    let sql = 'update users set houseNumber = ?, street = ?, city = ?, state = ?, country = ?, zipCode = ? where username = ?';
    let params = [req.body.data.houseNumber, req.body.data.street, req.body.data.city, req.body.data.state, req.body.data.country, req.body.data.zipCode, req.body.username];

    db.run(sql, params, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                message: 'success'
            });
        }
    });
});
