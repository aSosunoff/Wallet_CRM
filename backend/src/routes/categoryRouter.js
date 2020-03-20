const express = require('express');
const categoryController = require('../apiControllers/categoryController');

const categoryRouter = express.Router();
categoryRouter.post('/create', categoryController.postCreate);
categoryRouter.get('/get-all-category', categoryController.getAllListCategory);
categoryRouter.post('/edit', categoryController.postedit);

module.exports = categoryRouter;
