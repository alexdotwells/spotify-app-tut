var express = require('express');
var app = express();

app.use(express.static(__dirname + '/site'));

console.log('Spotify App running on port: 9000');
app.listen(9000);
