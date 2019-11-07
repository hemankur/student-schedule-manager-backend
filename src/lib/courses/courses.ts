import express = require('express');

let app = module.exports = express();
let db = require('../../api/database.ts');


let cors = require('cors');
app.use(cors());

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
