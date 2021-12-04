const isError = require('lodash.iserror');

const { parseError, printError } = require('./error.js');
const { printNode, isNode } = require('./visit.js');

function getErrors(error) {
  const errors = [];
  for (let cause = error; cause; cause = cause.cause) {
    errors.push(cause);
  }
  return errors;
}

function parseErrors(errors, options = {}) {
  const { frames = true } = options;
  let errors_;

  if (isError(errors)) {
    errors_ = getErrors(errors);
  } else if (isNode(errors, 'ErrorChain')) {
    errors_ = errors.errors;
    if (frames || errors_.every((error) => !error.frames)) {
      return errors;
    }
  } else {
    throw new Error(
      'errors argument to parseErrors must be an Error, an array of Error, or parseError(errors)',
    );
  }

  return {
    type: 'ErrorChain',
    errors: errors_.map((error) => parseError(error, options)),
  };
}

function printErrors(errors, options = {}) {
  if (isError(errors)) {
    return (
      getErrors(errors)
        // avoid calling parseError because printError can return error.stack much of the time
        .map((error) => printError(error, options))
        .join('\nCaused by: ')
    );
  } else if (isNode(errors, 'ErrorChain')) {
    return printNode(errors, options);
  } else {
    throw new Error('errors argument to printErrors must be an error or parseErrors(errors)');
  }
}

module.exports = { getErrors, parseErrors, printErrors };
