# Spotify App Tut # (created by: alex wells)

## Prep Work ##
<br />
Before we start coding, lets check the [Spotify API documentation](https://developer.spotify.com/web-api/) to see which of the [Authorization flows](https://developer.spotify.com/web-api/authorization-guide/) will work best for our use-case.

| Flow Type          | Needs back-end? |  Can Refresh Access Token? | Details |
|--------------------|:---------------:|:--------------------------:|---------|
| Authorization Code | Yes | Yes | Best for long-running apps. User logs in only once. It provides an access token that can be refreshed. Since the token exchange involves sending your secret key, this should happen on the backend, not a client like a browser/mobile app. |
| Client Credentials | Yes | No  | Authenticates the app, but does not include authorization, and therefore cannot be used to access/manage private user data |
| Implicit Grant     | Yes | No  | Frontend only (i.e. does not use server side code). Generates user login screen for authorization. Access Token cannot be refreshed. |


Once you've selected the auth-flow that works best for your project (or even if you're not sure yet) the next step is to register your app with [Spotify > My Applications](https://developer.spotify.com/my-applications/) to generate the `client_id `and `client_secret` values needed to authorize your app with Spotify.

___

## Getting Started ##
<br />
This tutorial will use node.js and npm - so make sure you have those installed before you get started.

1. Step one is to open the command prompt an navigate to the root of your project directory. From there we'll initiate our new npm package entering the following command:

       $ npm init --y

    > *[Note: "--y"  tells npm to use the default options instead of prompting you for each.]*

2. Next we'll grab express. Enter the following into the command prompt to add express to your project:

       $ npm install express --save

3. Open the project in your favorite text-editor and create a new file in the root directory named: **server.js**

4. We will be serving our frontend from a directory named "site," so lets create that now as well by adding a "site" folder to our root directory. (We'll come back to this after we finish up with our server.js file.)

5. Add the following javascript to your server.js file to serve your static files. (I'll add more here later, but this is enough for now as this is unrelated to our first authorization flow).

  ```javascript
  var express = require('express');
  var app = express();

  app.use(express.static(__dirname + '/site'));

  console.log('Spotify App running on port: 9000');
  app.listen(9000);
  ```

6. You should now be able to test your application by entering the following into your command prompt. If everything is working correctly you should see `Spotify App running on port: 9000` appear in the command prompt.:

       $ node server.js

    > *[Note: To end the program, you should be using `Ctrl+C`. If you do that, it sends SIGINT, which allows the program to end gracefully, unbinding from any ports it is listening on.]*

7. The penultimate step is create a basic HTML document within the `/sites` folder we created in step 4 above. Name this file `index.html`.

8. Finally, we'll need to add a button to our `index.html` that will tell our application to start the authentication process. Add the following markup to the `body` of your page.

    `<a class="btn" href="/login">Log in with Spotify</a>`

    > *[Note: Make sure your `href` points to `/login`.]*

___

## Conclusion ##
<br />
Test your new updates by repeating step 6. Once your `server.js` is running navigate to `http://localhost:9000` in your browser and you should see your `index.html` page.

#### When you're ready, it's [on to the next one!](SERVER.md) ####
