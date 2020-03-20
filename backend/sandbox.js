const mongoose = require('./src/libs/mongoose');
const UserModel = require('./src/models/user');
const CategoryModel = require('./src/models/category');

(async () => {
	try {
		await await new Promise((resolve, reject) => {
			mongoose.connection.on("open", resolve);
		});

		await mongoose.connection.db.dropDatabase();

		const user = new UserModel({
			name: 'Alex',
			email: 'eamil@mail.ru',
			password: '123123',
		});

		await user.save();

		const c1 = await CategoryModel.createNew({
			id_user: user._id,
			title: 'test',
			limit: 1
		})
		const c2 = await CategoryModel.createNew({
			id_user: user._id,
			title: 'test 2',
			limit: 2
		})
		const c3 = await CategoryModel.createNew({
			id_user: user._id,
			title: 'test 3',
			limit: 3
		})

		user.categories.push(c1);
		user.categories.push(c2);
		user.categories.push(c3);

		await user.save();

		const categoryFromDb = await CategoryModel
			.findOne({limit: '1'})
			.populate('id_user')
			.exec();

		console.log(categoryFromDb);

		const userFromDb = await UserModel
			.findOne({name: 'Alex'})
			.populate('categories')
			.exec();

		console.log(userFromDb);
	} catch (e) {
		console.log(e);
	} finally {
		process.exit(1);
	}
})();

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
