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
 * GET request that returns true if course is taken by the user
 */
app.get('/api/courses/:username/:courseID', (req, res) => {
    let sql = 'select * from registered where sid = ? and courseID = ?';
    let params = [req.params.username, req.params.courseID];
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            if (rows.length) {
                res.json({
                    message: 'success',
                    value: true
                });
                return;
            } else
                res.json({
                    message: 'success',
                    value: false
                });
        }
    });
});

/**
 * POST request that takes sid and courseID and adds them to the registered table if a record doesn't already exist.
 * Also updates the active capacity
 */
app.post('/api/courses/register', (req, res) => {
    let sql = 'select * from registered where sid = ?';
    let params = [req.body.sid];
    let dayTime = [];
    let newDayTime: string;
    let courses = [];

    db.all(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
        }
        if (rows) {
            for (const row of rows) {
                if (row.courseID === req.body.courseID) {
                    res.json({
                        error: 'Duplicate',
                        message: 'Student already registered'
                    });
                    return;
                } else {
                    courses.push(row.courseID);
                }
            }
            let sql = 'select * from courses where courseID in (select courseID from registered where registered.sid = ?)';
            let params = [req.body.sid];

            db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    for (const row of rows) {
                        dayTime.push(row.day + '' + row.time);
                    }
                    let sql = 'select * from courses where courseID = ?';
                    let params = [req.body.courseID];

                    db.get(sql, params, (err, row) => {
                        if (err) {
                            console.log(err);
                        } else {
                            newDayTime = row.day + row.time;
                            let conflict = false;
                            for (const item of dayTime) {
                                if (item === newDayTime) {
                                    conflict = true;
                                }
                            }
                            if (conflict) {
                                res.json({
                                    error: 'Conflict',
                                    message: 'Time conflict'
                                });
                                return;
                            } else {
                                sql = 'select * from courses where courseID = ?';
                                params = [req.body.courseID];
                                db.get(sql, params, (err, row) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        if (row.active >= row.capacity) {
                                            res.json({
                                                error: 'Full',
                                                message: 'Capacity full. Please try later.'
                                            });
                                            return;
                                        } else {
                                            sql = 'update courses set active = ? where courseID = ?';
                                            params = [row.active + 1, req.body.courseID];
                                            db.run(sql, params, (err) => {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    sql = 'insert into registered (sid, courseID) values (?, ?)';
                                                    params = [req.body.sid, req.body.courseID];
                                                    db.run(sql, params, (err) => {
                                                        if (err) {
                                                            res.status(400).json({error: err});
                                                            return;
                                                        } else {
                                                            res.json({message: 'success'});
                                                        }
                                                    });
                                                }
                                            })
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    });
});

/**
 * POST request that takes sid and courseID and adds them to the registered table if a record doesn't already exist.
 * Also updates the active capacity
 */
app.post('/api/courses/check/', (req, res) => {
    let sql = 'select * from registered where sid = ?';
    let params = [req.body.sid];
    let dayTime = [];
    let newDayTime: string;
    let courses = [];

    db.all(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
        }
        if (rows) {
            for (const row of rows) {
                if (row.courseID === req.body.courseID) {
                    res.json({
                        error: 'Duplicate',
                        message: 'Student already registered'
                    });
                    return;
                }
            }
            let sql = 'select * from courses where courseID in (select courseID from registered where registered.sid = ?)';
            let params = [req.body.sid];

            db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    for (const row of rows) {
                        dayTime.push({key: row.day + '' + row.time, course: row});
                        courses.push(row);
                    }
                    let sql = 'select * from courses where courseID = ?';
                    let params = [req.body.courseID];

                    db.get(sql, params, (err, row) => {
                        if (err) {
                            console.log(err);
                        } else {
                            newDayTime = row.day + row.time;
                            let conflict = false;
                            let conflictCourse: string;
                            for (const item of dayTime) {
                                if (item.key === newDayTime) {
                                    conflict = true;
                                    conflictCourse = item;
                                }
                            }
                            if (conflict) {
                                res.json({
                                    error: 'Conflict',
                                    message: 'Time conflict',
                                    data: conflictCourse
                                });
                                return;
                            } else {
                                sql = 'select * from courses where courseID = ?';
                                params = [req.body.courseID];
                                db.get(sql, params, (err, row) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        if (row.active >= row.capacity) {
                                            res.json({
                                                error: 'Full',
                                                message: 'Capacity full. Please try later.'
                                            });
                                            return;
                                        }
                                    }
                                });
                            }
                        }
                    });
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
                    sql = 'select * from courses where courseID = ?';
                    params = [req.body.courseID];
                    db.get(sql, params, (err, row) => {
                        if (err) {
                            console.log(err);
                        } else {
                            const newActive = row.active - 1;
                            sql = 'update courses set active = ? where courseID = ?';
                            params = [newActive, req.body.courseID];
                            db.run(sql, params, (err) => {
                                if (err) console.log(err);
                                else {
                                    res.json({message: 'success'});
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

