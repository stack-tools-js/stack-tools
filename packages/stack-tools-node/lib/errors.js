const { cleanErrors: cleanErrorsV8 } = require('@stack-tools/v8-tools');
const { isInternalFrame } = require('./frame.js');

function cleanErrors(errors, predicate = isInternalFrame) {
  return cleanErrorsV8(errors, predicate);
}

module.exports = { cleanErrors };
