const frame = require('./frame.js');
const error = require('./error.js');
const errors = require('./errors.js');

module.exports = { ...frame, ...error, ...errors };
