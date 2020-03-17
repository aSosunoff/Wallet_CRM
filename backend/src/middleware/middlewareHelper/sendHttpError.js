module.exports = (req, res, next) => {
	res.sendHttpError = error => {
		res.status(error.status).send(error.message);
	};

	next();
};
