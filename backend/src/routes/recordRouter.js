const express = require('express');
const recordController = require('../apiControllers/recordController');

const recordRouter = express.Router();
recordRouter.post('/create', recordController.postCreate);

module.exports = recordRouter;
