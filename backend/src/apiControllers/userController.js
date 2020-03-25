const { HttpError, AuthError } = require('../error');
const UserModel = require('../models/user');
const logger = require('../libs/logger')(module);
const mapRecords = require('../libs/mapRecord')(obj => ({
	id: obj._id,
	email: obj.email,
	name: obj.name,
	bill: obj.bill,
}));

exports.getUser = async (req, res, next) => {
	try {
		let id = req.params['id'];

		const user = await UserModel.findById(id);

		res.send(mapRecords(user));
	} catch (e) {
		return next(new HttpError(404, 'Пользователь не найден'));
	}
};

exports.getAuthUser = (req, res, next) => {
	res.send(mapRecords(req.user));
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

		res.send(mapRecords(user));
	} catch (e) {
		return next(new HttpError(400, 'Ошибка обновления пользователя'));
	}
};
