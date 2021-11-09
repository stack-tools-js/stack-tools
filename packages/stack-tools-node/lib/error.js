const { cleanError: cleanErrorV8 } = require('@stack-tools/v8-tools');
const { isInternalFrame } = require('./frame.js');

function cleanError(error, predicate = isInternalFrame) {
  return cleanErrorV8(error, predicate);
}

module.exports = { cleanError };
