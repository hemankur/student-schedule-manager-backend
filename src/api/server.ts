import express = require('express');

let app = express();
let users = require('../lib/users/users');

app.use(users);

app.listen(8011);
console.log('Listening on port 8011');
