const { HttpError, AuthError } = require('../error');
const UserModel = require('../models/user');

exports.postLogin = (req, res, next) => {
	let email = req.body.email;
	let password = req.body.password;

	UserModel.login(email, password, (err, user) => {
		if (err) {
			if (err instanceof AuthError) {
				return next(new HttpError(403, err.message));
			} else {
				return next(err);
			}
		}

		req.session.user = user._id;

		res.send(user.name);
	});
};

exports.postRegister = (req, res, next) => {
	let email = req.body.email;
	let password = req.body.password;
	let name = req.body.name;

	UserModel.register(name, email, password, (err, user) => {
		if (err) {
			if (err instanceof AuthError) {
				return next(new HttpError(401, err.message));
			} else {
				return next(err);
			}
		}

		req.session.user = user._id;

		res.send(user.name);
	});
};

exports.postLogout = (req, res, next) => {
	const sid = req.session.id;

	const io = req.app.get('io');

	req.session.destroy(err => {
		/* io.sockets._events['session:reload'](sid); */

		if (err) {
			return next(err);
		}

		res.send('Вы не авторизованы в системе');
	});
};
