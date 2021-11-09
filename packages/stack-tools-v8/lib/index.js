const base = require('stack-tools');

const frame = require('./frame.js');
const error = require('./error.js');
const errors = require('./errors.js');

module.exports = Object.assign({}, base, frame, error, errors);
