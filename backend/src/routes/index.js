const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
// const chatRouter = require('./chatRouter');

module.exports = (app) => {
	app.use('/api/auth', authRouter);
	app.use('/api/user', require('../middleware/middlewareHelper/checkAuth'), userRouter);
	// app.use('/chat', chatRouter);
}
