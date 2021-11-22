const base = require('stack-tools');

const frame = require('./frame.js');
const error = require('./error.js');
const errors = require('./errors.js');
const visit = require('./visit.js');

module.exports = { ...base, ...frame, ...error, ...errors, ...visit };
