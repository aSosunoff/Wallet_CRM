const { HttpError, AuthError } = require('../error');
const UserModel = require('../models/user');
const logger = require('../libs/logger')(module);

exports.getUser = async (req, res, next) => {
	try {
		let id = req.params['id'];

		const user = await UserModel.findById(id);

		const { _id, email, name, bill } = user;

		res.send({
			id: _id,
			email,
			name,
			bill,
		});
	} catch (e) {
		return next(new HttpError(404, 'Пользователь не найден'));
	}
};

exports.getAuthUser = (req, res, next) => {
	const {
		_id,
		email,
		name,
		bill,
	} = req.user;

	res.send({
		id: _id.toString(),
		email,
		name,
		bill,
	});
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

		res.send({
			id: req.body.id,
			email: req.body.email,
			name: req.body.name,
			bill: req.body.bill,
		});
	} catch (e) {
		return next(new HttpError(400, 'Ошибка обновления пользователя'));
	}
};
