# React + Vite

This shows how to work with passportjs in a React.js app, it makes use of client-side rendering.
```
# available routes
/
/auth/login
/auth/register
/dashboard (protected route) (authorized role)
```

[github](https://github.com/forinda/react-router-protected-routes-ts)

[react-email-youtube](https://www.youtube.com/watch?v=D4pS4b9-DgA)

## get started with react-email
- go to the docs page [here](https://react.email/docs/integrations/resend), 
- check the manual setup link
- navigate to your react/client folder
- install dep inside the root folder of your client project 

``` bash
npm install react-email @react-email/button @react-email/html @react-email/components -E 
```
- update package.json file and add the script
``` bash
"email": "email dev --dir src/emails"
```

The `--dir src/emails` is pointing to where my email folder is in my client folder structure.
- create a file e.g `Resetpassword.js` inside the `src/emails` folder
- inside the newly created file I can copy a template [from-here](https://demo.react.email/preview/vercel-invite-user)
- modify the template to my taste
- stop my client server
- run the email server from inside the root of my react/client folder
using ```npm run email```
- it will show me a preview of my email template
- start my client server again by running 