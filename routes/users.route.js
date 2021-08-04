const express = require('express');
const {loginUser, signUpUser, getUserDetails, updateUserDetails } = require('../functions/users.function');
const isUserAuth = require('../utils/auth');


const usersRouter = express.Router();

// Login User
usersRouter.post('/login_user', loginUser);
// SignUp User
usersRouter.post('/signup_user', signUpUser);
// Get User details
usersRouter.get('/user', isUserAuth, getUserDetails);
// Update User Details
usersRouter.post('/user', isUserAuth, updateUserDetails);



module.exports = usersRouter