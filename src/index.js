const frame = require('./frame');
const error = require('./error');
const errors = require('./errors');

module.exports = { ...frame, ...error, ...errors };
