const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');
const recordRouter = require('./recordRouter');
// const chatRouter = require('./chatRouter');

module.exports = (app) => {
	app.use('/api/auth', authRouter);
	app.use('/api/user', require('../middleware/middlewareHelper/checkAuth'), userRouter);
	app.use('/api/category', require('../middleware/middlewareHelper/checkAuth'), categoryRouter);
	app.use('/api/record', require('../middleware/middlewareHelper/checkAuth'), recordRouter);
	// app.use('/chat', chatRouter);
}
