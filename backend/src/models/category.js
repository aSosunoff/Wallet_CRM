const mongoose = require('../libs/mongoose');
const { CategoryError } = require('../error');
const UserModel = require('./user');

const categorySchema = new mongoose.Schema({
	id_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	title: {
		type: String,
		required: true,
		unique: true,
	},
	limit: {
		type: Number,
		required: true,
	},
	records: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Record',
		},
	],
	created: {
		type: Date,
		default: Date.now,
	},
});

categorySchema.statics.createNew = async function({ id_user, title, limit }) {
	const CategoryModel = this;

	let category = await CategoryModel.findOne({ title });

	if (category) {
		throw new CategoryError(`У пользователя уже имеется ${title} категория`);
	}

	const user = await UserModel.findById(id_user);

	category = new CategoryModel({
		id_user,
		title,
		limit,
	});

	await category.save();

	user.categories.push(category);

	await user.save();

	return category;
};

categorySchema.statics.getAllCategories = async function() {
	const categories = await this.find()
		.populate('records')
		.exec();

	return categories;
};

module.exports = mongoose.model('Category', categorySchema);
