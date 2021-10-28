const v8 = require('../lib/v8/errors.js');
const { isInternalFrame } = require('./frame.js');

function cleanErrors(errors, predicate = isInternalFrame) {
  return v8.cleanErrors(errors, predicate);
}

module.exports = { ...v8, cleanErrors };
