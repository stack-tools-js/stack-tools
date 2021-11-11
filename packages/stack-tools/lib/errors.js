const isError = require('iserror');

const { parseError, printError } = require('./error.js');
const { visit } = require('./visit.js');

const { isArray } = Array;

function getErrorChain(error) {
  const errors = [];
  for (let cause = error; cause; cause = cause.cause) {
    errors.push(cause);
  }
  return errors;
}

function parseErrors(errors, options = {}) {
  if (isError(errors)) {
    return getErrorChain(errors).map((error) => parseError(error, options));
  } else if (isArray(errors)) {
    return errors.map((error) => parseError(error, options));
  } else {
    throw new Error(
      'errors argument to parseError must be an Error, an array of Error, or parseError(errors)',
    );
  }
}

function printErrors(errors, options = {}) {
  if (isError(errors)) {
    return (
      getErrorChain(errors)
        // avoid calling parseError -- printError can return error.stack much of the time
        .map((error) => printError(error, options))
        .join('\nCaused by: ')
    );
  } else {
    return visit.ErrorChain(parseErrors(errors, options), visit);
  }
}

module.exports = { getErrorChain, parseErrors, printErrors };
