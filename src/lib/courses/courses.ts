import express = require('express');

let app = module.exports = express();
let db = require('../../api/database.ts');


let cors = require('cors');
app.use(cors());

/**
 * GET request that returns all courses.
 */
app.get('/api/courses/', (req, res) => {
    let sql = 'select * from courses';
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                message: 'success',
                data: rows
            })
        }
    });
});

/**
 * POST request that takes sid and courseID and adds them to the registered table if a record doesn't already exist.
 */
app.post('/api/courses/register', (req, res) => {
    let sql = 'select * from registered where sid = ? and courseID = ?';
    let params = [req.body.sid, req.body.courseID];

    db.get(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
        }
        if (rows) {
            res.json({message: 'Student already registered'});
            return;
        } else if (!rows) {
            sql = 'insert into registered (sid, courseID) values (?, ?)';
            db.run(sql, params, (err) => {
                if (err) {
                    res.status(400).json({error: err});
                    return;
                } else {
                    res.json({message: 'success'});
                }
            });
        }
    });
});

/**
 * Patch request that takes sid and courseID and deleted the entry from the registered table, if present.
 */
app.patch('/api/courses/unregister', (req, res) => {
    let sql = 'select * from registered where sid = ? and courseID = ?';
    let params = [req.body.sid, req.body.courseID];

    db.get(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
        }
        if (!rows) {
            res.json({message: 'Student already unregistered'});
            return;
        } else if (rows) {
            sql = 'delete from registered where sid = ? and courseID = ?';
            db.run(sql, params, (err) => {
                if (err) {
                    res.status(400).json({error: err});
                    return;
                } else {
                    res.json({message: 'success'});
                }
            });
        }
    });
});
