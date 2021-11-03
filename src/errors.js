const isError = require('iserror');

const { printHeader } = require('./internal/header.js');
const { parseError, printError } = require('./error');

function parseErrors(error) {
  if (isError(error)) {
    const chain = [];
    for (let cause = error; cause; cause = cause.cause) {
      chain.push(parseError(cause));
    }
    return chain;
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
  if (isError(errors)) {
    const chain = [];
    for (let cause = errors; cause; cause = cause.cause) {
      chain.push(cause);
    }
    return __printErrorHeaders(chain);
  } else {
    return __printErrorHeaders(errors);
  }
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

module.exports = { parseErrors, printErrorHeaders, printErrors };
