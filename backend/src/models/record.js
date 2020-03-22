const mongoose = require('../libs/mongoose');
const { RecordError } = require('../error');
const CategoryModel = require('./category');


const recordSchema = new mongoose.Schema({
	id_category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
	},
	type: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	created: {
		type: Date,
		default: Date.now,
	},
});

recordSchema.statics.createNew = async function({ idCategory, type, amount, description }) {
	const RecordModel = this;

	const category = await CategoryModel.findById(idCategory);

	const record = new RecordModel({
		id_category: idCategory,
		type,
		amount,
		description,
	});

	await record.save();

	category.records.push(record);

	await category.save();

	return record;
};

module.exports = mongoose.model('Record', recordSchema);
