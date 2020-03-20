const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');
// const chatRouter = require('./chatRouter');

module.exports = (app) => {
	app.use('/api/auth', authRouter);
	app.use('/api/user', require('../middleware/middlewareHelper/checkAuth'), userRouter);
	app.use('/api/category', require('../middleware/middlewareHelper/checkAuth'), categoryRouter);
	// app.use('/chat', chatRouter);
}
