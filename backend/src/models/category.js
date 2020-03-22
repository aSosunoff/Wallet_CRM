const mongoose = require('../libs/mongoose');
const { CategoryError } = require('../error');

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

	category = new CategoryModel({
		id_user: id_user,
		title,
		limit,
	});

	await category.save();

	return category;
};

module.exports = mongoose.model('Category', categorySchema);
