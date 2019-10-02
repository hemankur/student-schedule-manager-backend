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
            userID TEXT UNIQUE,
            displayName TEXT,
            email TEXT,
            password TEXT,
            salt TEXT,
            accountCreatedTime INTEGER
        )`, []);
        process.stdout.write('done\n');
    }
});

module.exports = db;
