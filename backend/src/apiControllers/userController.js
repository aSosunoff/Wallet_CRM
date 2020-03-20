const { HttpError, AuthError } = require('../error');
const UserModel = require('../models/user');
const logger = require('../libs/logger')(module);

exports.getUser = async (req, res, next) => {
	logger.debug('getUser');

	try {
		let id = req.params['id'];

		const user = await UserModel.findById(id);

		const { _id, email, name } = user;

		res.send({
			id: _id,
			email,
			name,
		});
	} catch (e) {
		return next(new HttpError(404, 'Пользователь не найден'));
	}
};

exports.getAuthUser = (req, res, next) => {
	logger.debug('getAuthUser');

	const { email, name } = req.user;

	res.send({
		id: req.session.user,
		email,
		name,
	});
};

exports.putUpdateUser = async (req, res, next) => {
	logger.debug('putUpdateUser');

	try {
		let id = req.body.id;

		const user = await UserModel.findOneAndUpdate(
			{ _id: id },
			{
				email: req.body.email,
				name: req.body.name,
			},
			{ new: true }
		);

		res.end();
	} catch (e) {
		return next(new HttpError(400, 'Ошибка обновления пользователя'));
	}
};
