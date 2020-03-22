const { HttpError, RecordError } = require('../error');
const RecordModel = require('../models/record');

exports.postCreate = async (req, res, next) => {
	try {
		const record = await RecordModel.createNew(req.body);

		let recordObject = record.toObject();

		res.send({
			id: recordObject._id,
			...recordObject,
		});
	} catch (e) {
		if (e instanceof RecordError) {
			return next(new HttpError(403, e.message));
		} else {
			return next(e);
		}
	}
};
