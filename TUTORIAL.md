# Spotify App Tut #

### Prep Work ###
Before we start coding, lets check the [Spotify API documentation](https://developer.spotify.com/web-api/) to see which of the [Authorization flows](https://developer.spotify.com/web-api/authorization-guide/) will work best for our use-case.

| Flow Type          | Needs back-end? |  Can Refresh Access Token? | Details |
|--------------------|:---------------:|:--------------------------:|---------|
| Authorization Code | Yes | Yes | Best for long-running apps. User logs in only once. It provides an access token that can be refreshed. Since the token exchange involves sending your secret key, this should happen on the backend, not a client like a browser/mobile app. |
| Client Credentials | Yes | No  | Authenticates the app, but does not include authorization, and therefore cannot be used to access/manage private user data |
| Implicit Grant     | Yes | No  | Frontend only (i.e. does not use server side code). Generates user login screen for authorization. Access Token cannot be refreshed. |
