const mongoose = require('./src/libs/mongoose');
const UserModel = require('./src/models/user');

(async () => {
	try {
		await await new Promise((resolve, reject) => {
			mongoose.connection.on('open', resolve);
		});

		await mongoose.connection.db.dropDatabase();

		const user = new UserModel({
			name: 'Alex',
			email: 'aiddeath@mail.ru',
			password: '123123',
		});

		await user.save();
	} catch (e) {
		console.log(e);
	} finally {
		process.exit(1);
	}
})();
