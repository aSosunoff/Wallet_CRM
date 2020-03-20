const express = require('express');
const categoryController = require('../apiControllers/categoryController');

const categoryRouter = express.Router();
categoryRouter.post('/create', categoryController.postCreate);

module.exports = categoryRouter;
