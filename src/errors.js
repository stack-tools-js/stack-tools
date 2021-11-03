const isError = require('iserror');

const { printHeader } = require('./internal/header.js');
const { parseError, printError } = require('./error.js');

function getErrors(error) {
  const errors = [];
  for (let cause = error; cause; cause = cause.cause) {
    errors.push(cause);
  }
  return errors;
}

function parseErrors(errors) {
  if (isError(errors)) {
    return getErrors(errors).map((error) => parseError(error));
  } else {
    throw new Error('error argument to parseError must be an Error');
  }
}

function __printErrorHeaders(errors) {
  let str = '';
  for (let i = 0; i < errors.length; i++) {
    if (i > 0) str += '\nCaused by: ';

    str += printHeader(errors[i]);
  }
  return str;
}

function printErrorHeaders(errors) {
  return __printErrorHeaders(isError(errors) ? getErrors(errors) : errors);
}

function __printErrors(errors) {
  let str = '';
  for (let i = 0; i < errors.length; i++) {
    const error = errors[i];
    if (i > 0) str += '\nCaused by: ';

    str += printError(error);
  }
  return str;
}

function printErrors(errors) {
  return __printErrors(isError(errors) ? parseErrors(errors) : errors);
}

module.exports = { getErrors, parseErrors, printErrorHeaders, printErrors };
