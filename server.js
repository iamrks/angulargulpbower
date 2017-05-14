var express = require('express');
var path = require('path');
var app = express();

app.use(express.static('dist'));

process.on('uncaughtException', function (err) {
    console.log(err);
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});