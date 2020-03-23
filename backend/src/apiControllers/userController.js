const { HttpError, AuthError } = require('../error');
const UserModel = require('../models/user');
const logger = require('../libs/logger')(module);

const MapUser = (record) => {
	let recordObject = null;

	if('toObject' in record){
		recordObject = record.toObject();
	} else {
		recordObject = record;
	}

	return {
		id: recordObject._id,
		email: recordObject.email,
		name: recordObject.name,
		bill: recordObject.bill,
	}
}

exports.getUser = async (req, res, next) => {
	try {
		let id = req.params['id'];

		const user = await UserModel.findById(id);

		res.send(MapUser(user));
	} catch (e) {
		return next(new HttpError(404, 'Пользователь не найден'));
	}
};

exports.getAuthUser = (req, res, next) => {
	res.send(MapUser(req.user));
};

exports.putUpdateUser = async (req, res, next) => {
	try {
		const user = await UserModel.findOneAndUpdate(
			{ _id: req.body.id },
			{
				email: req.body.email,
				name: req.body.name,
				bill: req.body.bill,
			},
			{ new: true }
		);

		res.send(MapUser(user));
	} catch (e) {
		return next(new HttpError(400, 'Ошибка обновления пользователя'));
	}
};
