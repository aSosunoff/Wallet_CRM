const express = require('express');
const userController = require('../apiControllers/userController');

const userRouter = express.Router();
userRouter.get('/getAuthUser', userController.getAuthUser);
userRouter.put('/putUpdateUser', userController.putUpdateUser);
userRouter.get('/:id', userController.getUser);

module.exports = userRouter;
