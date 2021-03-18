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

## How To Install

Clone the repoitory.
```
$ git clone https://github.com/xnick7x/chat-app_with-authentication.git
```
Move into the cloned folder
```
$ cd chat-app_with-authentication
```
Install dependencies
```
$ npm install
$ npm install --prefix client
```
Create env file in root directory and add following variables : PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRES, EMAIL, EMAIL_PASSWORD, NODE_ENV
```
$ touch config.env
```
To start the front-end as well as server run this command
```
$ npm run dev
```
#### npm run client : 
for running only front-end

#### npm run server : 
for running only back-end
