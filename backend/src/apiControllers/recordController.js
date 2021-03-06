const { HttpError, RecordError } = require('../error');
const RecordModel = require('../models/record');

const mapRecords = require('../libs/mapRecord')(obj => ({
	id: obj._id,
	type: obj.type,
	amount: obj.amount,
	description: obj.description,
	created: obj.created,
	category: require('../libs/mapRecord')(obj => ({
		id: obj._id,
		title: obj.title,
		limit: obj.limit,
	}))(obj.id_category),
}));

exports.mapRecords = mapRecords;

exports.postCreate = async (req, res, next) => {
	try {
		const record = await RecordModel.createNew(req.body);

		res.send(mapRecords(record));
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
		const records = await RecordModel.getList();

		res.send(records.map(mapRecords));
	} catch (e) {
		return next(e);
	}
};
