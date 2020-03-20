const { HttpError } = require('../error');
const logger = require('../libs/logger')(module);

module.exports = app => {
	app.use((err, req, res, next) => {
		if (typeof err == 'number') {
			err = new HttpError(err);
		}

		if (err instanceof HttpError) {
			res.sendHttpError(err);
		} else {
			logger.error(err);
			res.sendHttpError(new HttpError(500));
		}
	});
};

/* db.dropDatabase();
// use t;
db.user.save({
	name: 'Alex',
	catalog: [
		{ _id: ObjectId(), title: 'войти', limit: 1 },
		{ _id: ObjectId(), title: 'войти 2', limit: 2 },
	],
});

db.user.save({ name: 'Bill', catalog: [{ _id: ObjectId(), title: 'выйти', limit: 100 }] });

db.user.update(
	{ name: 'Alex', 'catalog._id': ObjectId('5e73d1a7a777af7d3ecb45af') },
	{ $set: { 'catalog.$.title': '123' } }
);

let get_user = id => db.user.find({ _id: new ObjectId(id) });
let catalog_update = (id, data) => {
	db.user.update({ _id: new ObjectId(id) }, { catalog: { title: '123', limit: 1 } });
}; */
