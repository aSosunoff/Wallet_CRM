const { HttpError, CategoryError } = require('../error');
const CategodyModel = require('../models/category');
const UserModel = require('../models/user');
const logger = require('../libs/logger')(module);
const mapRecords = require('../libs/mapRecord')(obj => ({
	id: obj._id,
	title: obj.title,
	limit: obj.limit,
	id_user: obj.id_user,
}));


exports.postCreate = async (req, res, next) => {
	try {
		const category = await CategodyModel.createNew({
			id_user: req.user._id,
			title: req.body.title,
			limit: req.body.limit,
		});

		res.send(mapRecords(category));
	} catch (e) {
		if (e instanceof CategoryError) {
			return next(new HttpError(403, e.message));
		} else {
			return next(e);
		}
	}
};

exports.getAllListCategory = async (req, res, next) => {
	try {
		const categories = await CategodyModel.find();

		res.send(categories.map(mapRecords));
	} catch (e) {
		return next(e);
	}
};

exports.postEdit = async (req, res, next) => {
	try {
		const category = await CategodyModel.findByIdAndUpdate(
			{ _id: req.body.id },
			{
				title: req.body.title,
				limit: req.body.limit,
			},
			{ new: true }
		);

		res.send(mapRecords(category));
	} catch (e) {
		if (e instanceof CategoryError) {
			return next(new HttpError(403, e.message));
		} else {
			return next(e);
		}
	}
};
