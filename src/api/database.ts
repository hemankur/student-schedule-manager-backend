import sqlite3 = require('sqlite3');

const DBSOURCE = 'db.sqlite';

function dbRun(db, command, params) {
    db.run(command, params, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.log(err.message);
        throw err;
    } else {
        process.stdout.write('Connecting to the SQLite database... ');
        dbRun(db, `CREATE TABLE IF NOT EXISTS users (
            username TEXT UNIQUE,
            displayName TEXT,
            password TEXT,
            year NUMBER
        )`, []);
        dbRun(db, `CREATE TABLE IF NOT EXISTS courses (
            courseID NUMBER UNIQUE,
            department TEXT,
            courseNumber NUMBER,
            courseName TEXT,
            term TEXT,
            instructor TEXT,
            location TEXT,
            day TEXT,
            time TEXT,
            capacity NUMBER, 
            active NUMBER
        )`, []);
        dbRun(db, `CREATE TABLE IF NOT EXISTS registered (
        sid NUMBER, 
        courseID NUMBER)`, []);
        process.stdout.write('done\n');
    }
});


module.exports = db;
