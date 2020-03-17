const crypto = require('crypto');
const mongoose = require('../libs/mongoose');
const { AuthError } = require('../error');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	hashedPassword: {
		type: String,
		required: true,
	},
	salt: {
		type: String,
		required: true,
	},
	created: {
		type: Date,
		default: Date.now,
	},
});

userSchema.methods.encryptPassword = function(password) {
	return crypto
		.createHmac('sha1', this.salt)
		.update(password)
		.digest('hex');
};

userSchema
	.virtual('password')
	.set(function(password) {
		this._plainPassword = password;
		this.salt = Math.random() + '';
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function() {
		return this._plainPassword;
	});

userSchema.methods.checkPassword = function(password) {
	return this.encryptPassword(password) === this.hashedPassword;
};

userSchema.statics.login = function(email, password, callback) {
	const UserModel = this;

	(async () => {
		let user = await UserModel.findOne({ email });

		if (!user) {
			return callback(new AuthError('Вы не зарегистрированы'));
		}

		if (!user.checkPassword(password)) {
			return callback(new AuthError('Пароль не верен'));
		}

		return callback(null, user);
	})();
};

userSchema.statics.register = function(name, email, password, callback) {
	const UserModel = this;

	(async () => {
		let user = await UserModel.findOne({ email });

		if (user) {
			return callback(new AuthError('Пользователь с таким Email существует'));
		}

		user = new UserModel({
			name,
			email,
			password,
		});

		await user.save();

		return callback(null, user);
	})();
};

module.exports = mongoose.model('User', userSchema);
