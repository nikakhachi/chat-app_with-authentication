# MERN authentication

An authentication application built with MERN stack (MongoDB, Express, ReactJS, NodeJS)

Login/Register application. Has feature of reseting and changing passwords, by getting an email containing reset link from a bot

Has a private route which is accesible only with valid web token in localStorage, which is stored after login/registering.

### Back-end
Express for routing

Data is stored in MongoDB

BcryptJS for hashing passwords

JsonWebToken for generating tokens

NodeMailer for sending password reset links

### Front-end
React-Router for routing 

axios for fetching data

Private route ('/') accessible only with valid token

Private route displays list of registered users and register dates
