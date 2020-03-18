const { HttpError, AuthError } = require('../error');
const UserModel = require('../models/user');

exports.getUser = (req, res, next) => {
	let id = req.params['id'];

	UserModel.findById(id, (err, user) => {
		if(err) {
			return next(new HttpError(404, 'Пользователь не найден'));
		}

		const { _id, email, name } = req.user;

		res.send({
			id: _id,
			email,
			name,
		});
	});
};

exports.getAuthUser = (req, res, next) => {
	const { email, name } = req.user;

	res.send({
		id: req.session.user,
		email,
		name,
	});
};

exports.putUpdateUser = (req, res, next) => {
	let id = req.body.id;

	UserModel.findOneAndUpdate({_id: id}, {
		email: req.body.email,
		name: req.body.name
	},
	{new: true},
	(err, user) => {
		if(err) {
			return next(new HttpError(400, 'Ошибка обновления пользователя'));
		}

		res.end();
	});
};
