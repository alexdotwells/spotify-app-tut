//DEPENDENCIES
var express = require('express');
var request = require('request');
var querystring  = require('querystring');
var cookieParser = require('cookie-parser');

//SHARED
var client_id     = 'fe46bdc4a76547a98794b8bbeb6b14e1';
var client_secret = '615cffb587e3428d978ac41f12e0b9dc';
var redirect_uri  = 'http://localhost:9000/callback';

var stateKey = 'spotify_auth_state';

//EXPRESS
var app = express();
app.use(express.static(__dirname + '/site'))
   .use(cookieParser());

//ROUTES
app.get('/login', function(req, res) {

  //get state
  var stateVal = getStateVal(16);
  res.cookie(stateKey, stateVal);

  res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: 'user-read-private',
        redirect_uri: redirect_uri
      }));
});


app.get('/callback', function(req, res) {

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    //invalid state val
    res.redirect('/#' +
      querystring.stringify({
        error: 'invalid_state'
      }));

  } else {

    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    //-POST
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token;
        var refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        //log body to console
        // request.get(options, function(error, response, body) {
        //   console.log(body);
        // });

        //pass tokens to browser
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));

      } else {

        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));

      }
    });

    res.clearCookie(stateKey);
  }
});

app.get('/refresh_token', function(req, res) {
  var refresh_token = req.query.refresh_token;

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  //-POST
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });

});

// generate state string
var getStateVal = function(length) {
  var str = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    str += chars.charAt( Math.floor( Math.random() * chars.length));
  }
  return str;
};


//START SERVER
console.log('Spotify App running on port: 9000');
app.listen(9000);
