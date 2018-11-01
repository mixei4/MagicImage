const logger = require('../logger');

module.exports = fn =>
	(req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(function (error) {logger.error(error); next(error);});
	};