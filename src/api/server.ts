import express = require('express');

let app = express();
let users = require('../lib/users/users');
let courses = require('../lib/courses/courses');

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(users);
app.use(courses);


app.listen(8011);
console.log('Listening on port 8011');
