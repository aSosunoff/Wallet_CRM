const express = require('express');
const loginController = require('../apiControllers/authController');

const authRouter = express.Router();
authRouter.post('/login', loginController.postLogin);
authRouter.post('/register', loginController.postRegister);
authRouter.post('/logout', loginController.postLogout);

module.exports = authRouter;
