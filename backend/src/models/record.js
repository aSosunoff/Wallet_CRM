const mongoose = require('../libs/mongoose');
const { RecordError } = require('../error');
const CategoryModel = require('./category');
const UserModel = require('./user');

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

	const category = await CategoryModel.findById(idCategory)
		.populate('id_user')
		.exec();

	const { id_user: user } = category;

	if (type === 'outcome' && amount > user.bill) {
		throw new RecordError('На счёте не достаточно средств');
	}

	const userUpdated = await UserModel.findByIdAndUpdate(
		user._id,
		{
			bill: type === 'outcome' ? user.bill - amount : user.bill + amount,
		},
		{ new: true }
	);

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
