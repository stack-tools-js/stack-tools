const v8 = require('../lib/v8/error.js');
const { isInternalFrame } = require('./frame.js');

function cleanError(error, predicate = isInternalFrame) {
  return v8.cleanError(error, predicate);
}

module.exports = { ...v8, cleanError };
