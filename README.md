# MERN Chat App with Authentication

A Chat application built with MERN stack (MongoDB, Express, ReactJS, NodeJS) using WebSocket.

Authetication part has a feature of reseting and changing passwords, by getting an email containing reset link from a bot

After authentication token will be stored in cookies and user will be redirected  to the chat room.

### Back-end
Express for routing

Socket.IO for bidirectional communication

Data is stored in MongoDB

BcryptJS for hashing passwords

JsonWebToken for generating tokens

cookie-parser for using cookies

NodeMailer for sending password reset links

### Front-end
React-Router for routing 

axios for fetching data

Private route ('/') accessible only with valid token

Private route contains chat room.

Chat room has a bot which will notify user and other users that user joined, and also will notify others if any user left.

Chat room also has a users side bar which shows online and offline users.

Private screen has a log out button which resets token in cookies and redirects user to the login page.
