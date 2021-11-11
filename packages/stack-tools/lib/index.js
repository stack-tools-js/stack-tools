const error = require('./error.js');
const errors = require('./errors.js');
const visit = require('./visit.js');

module.exports = Object.assign({}, error, errors, visit);
