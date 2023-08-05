- [ ] create protected route
- [ ] create an authorized endpoint 
- [ ] forgot password and reset password

## forgot password
- the user enters thier email
- i check if the email exists
- if the email exists then send a message with a link to reset thier password
- update the password, what if they signed in with google 

[youtube-channel-explainging](https://www.youtube.com/watch?v=QaI7abh4n-8&pp=ygUcbm9kZSBqcyBwcm90ZWN0aW9uIG1lY2hhbmlzbQ==)

owasp recommended security measures for node.js server application
[owasp-top-ten](https://owasp.org/www-project-top-ten/)
[node-js-security-cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)
- set request size limit - npm i raw-body
- perform input validation - npm i validator
- perform output escaping
- perform applcation activity logging
- monitor the event loop
- take precaution against brute force
- anti-csrf tokens
- prevent http parameter pollution
- use access control list
- use appropriate headers - helmet npm i helmet

[snyk-code-node-protection](https://github.com/davieoba/snyk-goof)
[snyk-code-node-protection-youtube](https://www.youtube.com/watch?v=QSMbk2nLTBk)

## cookie session [link](https://www.npmjs.com/package/cookie-session)
[why-use-cookie-session](https://stackoverflow.com/questions/62894933/why-use-cookie-session-in-addition-to-passport-js)
A user session can be stored in two main ways with cookies: on the server or on the client.

This module stores the session data on the client within a cookie (comment: if you check the client, you will session.sig and session on my browser cookie), while a module like express-session stores only a session identifier on the client within a cookie and stores the session data on the server, typically in a database.

The following points can help you choose which to use:

- cookie-session does not require any database / resources on the server side, though the total session data cannot exceed the browser's max cookie size.
- cookie-session can simplify certain load-balanced scenarios.
- cookie-session can be used to store a "light" session and include an identifier to look up a database-backed secondary store to reduce database lookups.

The middleware will automatically add a Set-Cookie header to the response if the contents of req.session were altered. Note that no Set-Cookie header will be in the response (and thus no session created for a specific user) unless there are contents in the session, so be sure to add something to req.session as soon as you have identifying information to store for the session.

## express session
advnatages
- express.session stays on your server, so you can store things there that won't be accessible to the client
- express sessions don't have storage limits
- Storing things in the DOM mean you'll have to transmit everything over the wire, incurring extra bandwidth costs.

### advantage of using express session over cookie session
- the server session is scalable and works well with microarchitecture
- the server session is persistent
- more user data/info can be stored in the server session
- if the server restarts the user session is not lost
- performance optimization, using server sessions makes it possible for your app to not have bottlenecks since the in-memory of the server is not used for user session

## nice security features to implement
[ ] revoke access when a user logs out
[ ] session data cleanup
[x] token / cookie expiry 
[ ] notify the user

#### how to impement session data cleanup
- create a connection to my session database
- from there find and delete session that would have expired