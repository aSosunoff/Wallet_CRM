const { HttpError, RecordError } = require('../error');
const RecordModel = require('../models/record');

const MapRecord = (record) => {
	const recordObject = record.toObject();

	return {
		id: recordObject._id,
		type: recordObject.type,
		amount: recordObject.amount,
		description: recordObject.description,
		created: recordObject.created
	}
}

exports.postCreate = async (req, res, next) => {
	try {
		const record = await RecordModel.createNew(req.body);

		res.send(MapRecord(record));
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

		res.send(records.map(MapRecord));
	} catch (e) {
		return next(e);
	}
};
