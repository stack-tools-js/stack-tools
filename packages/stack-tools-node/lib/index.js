const v8 = require('@stack-tools/v8-tools');

const frame = require('./frame.js');
const error = require('./error.js');
const errors = require('./errors.js');

module.exports = { ...v8, ...frame, ...error, ...errors };
