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

exports.getAllListRecords = async (req, res, next) => {
	try {
		const records = await RecordModel.find();

		res.send(records.map(e => e.toObject()).map(e => ({ ...e, id: e._id })));
	} catch (e) {
		return next(e);
	}
};
