const mongoose = require('./src/libs/mongoose');

(async () => {
	try {
		await await new Promise((resolve, reject) => {
			mongoose.connection.on("open", resolve);
		});

		await mongoose.connection.db.dropDatabase();
	} catch (e) {
		console.log(e);
	} finally {
		process.exit(1);
	}
})();
