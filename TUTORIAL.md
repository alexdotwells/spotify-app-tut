# Spotify App Tut #

### Prep Work ###
Before we start coding, lets check the [Spotify API documentation](https://developer.spotify.com/web-api/) to see which of the [Authorization flows](https://developer.spotify.com/web-api/authorization-guide/) will work best for our use-case.

| Flow Type          | Needs back-end? |  Can Refresh Access Token? | Details |
|--------------------|:---------------:|:--------------------------:|---------|
| Authorization Code | Yes | Yes | Best for long-running apps. User logs in only once. It provides an access token that can be refreshed. Since the token exchange involves sending your secret key, this should happen on the backend, not a client like a browser/mobile app. |
| Client Credentials | Yes | No  | Authenticates the app, but does not include authorization, and therefore cannot be used to access/manage private user data |
| Implicit Grant     | Yes | No  | Frontend only (i.e. does not use server side code). Generates user login screen for authorization. Access Token cannot be refreshed. |


### server.js ###
This tutorial will use node.js and npm - so make sure you have those installed before you get started.

1. Step one is to open the command line an navigate to the root of your project directory. From there we'll initiate our new npm package entering the following command:

        npm init --y

     [ Note: "--y"  tells npm to use the default options instead of prompting you for each. ]

2. Next we'll grab express. Enter the following into the CLI to add it to your project:

        npm install express --save

3. Open the project in your favorite text-editor and create a new file in the root directory named: **server.js**

4. We will be serving our frontend from a directory named "site," so lets create that now as well by adding a "site" folder to our root directory. (We'll come back to this after we finish up with our server.js file.)

5. Add the following javascript to your server.js file to server your static files. (I'll add more here later, but this is enough for now as this is unrelated to our first authorization flow).

        var express = require('express');
        var app = express();

        app.use(express.static(__dirname + '/site'));

        console.log('Spotify App running on port: 9000');
        app.listen(9000);
        
