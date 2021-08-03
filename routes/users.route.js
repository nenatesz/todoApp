const express = require('express');
const {loginUser, signUpUser, getUserDetails } = require('../functions/users.function');
const isUserAuth = require('../utils/auth');


const usersRouter = express.Router();


usersRouter.post('/login_user', loginUser);
usersRouter.post('/signup_user', signUpUser);
usersRouter.get('/user', getUserDetails);



module.exports = usersRouter