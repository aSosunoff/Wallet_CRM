const authRouter = require('./authRouter');
// const chatRouter = require('./chatRouter');

module.exports = (app) => {
	app.use('/api/auth', authRouter);
	// app.use('/chat', chatRouter);
}
