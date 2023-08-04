1. you can only use either req.user or req.session not both
2. for passport session is required either cookie-session or express-session
3. with cookie-session the data will be overridden when I login from 2 seperate browsers the latest one will be the one in my session
Questions
1. I asked ChatGPT: when I login in a user in a browser and I go to another browser and login another user the first user is removed from my server session in my express server

2. I noticed that if I used incognito window in 2 seperate browsers the user session in not overridden so how is my server handling this, I tested it again and it did not happen like this, every user has their own seperate session, it is working well ?
