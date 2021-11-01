const { printErrorHeader, printError } = require('./error');

function printErrorHeaders(error) {
  let str = '';
  let first = true;
  for (let cause = error; cause; cause = cause.cause) {
    if (!first) str += '\nCaused by: ';

    str += printErrorHeader(cause);

    first = false;
  }
  return str;
}

function printErrors(error) {
  let str = '';
  let first = true;
  for (let cause = error; cause; cause = cause.cause) {
    if (!first) str += '\nCaused by: ';

    str += printError(cause);

    first = false;
  }
  return str;
}

module.exports = { printErrorHeaders, printErrors };
