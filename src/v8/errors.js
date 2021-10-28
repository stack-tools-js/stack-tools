const { Grammar } = require('nearley');
const isError = require('iserror');

const { parseUnambiguous } = require('./internal/nearley/util.js');
const CompiledErrorGrammar = require('./internal/nearley/error.js');
const { parseError, printError, cleanError } = require('./error.js');
const { parseFrame, isInternalFrame } = require('./frame.js');

const { isArray } = Array;

const ErrorGrammar = Grammar.fromCompiled(CompiledErrorGrammar);

function parseErrors(error, options = {}) {
  if (isError(error)) {
    const chain = [];

    for (let cause = error; cause; cause = cause.cause) {
      const errorChain = parseError(error, options);
      chain.push(...errorChain);
    }
    return chain;
  } else if (typeof error !== 'string') {
    throw new TypeError(
      `error argument to parseError must be an Error or string but received \`${
        error == null ? `${error}` : typeof error
      }\``,
    );
  }

  return parseUnambiguous(ErrorGrammar, error).map((error) => ({
    ...error,
    stack: error.stack.map((frame) => parseFrame(frame)),
  }));
}

function printErrors(errors, options = {}) {
  let parsedErrors;

  if (isError(errors)) {
    parsedErrors = [];
    for (let cause = errors; cause; cause = cause.cause) {
      parsedErrors.push(parseError(cause, options));
    }
  } else if (isArray(errors)) {
    parsedErrors = errors;
  }

  let first = true;
  let str = '';
  for (let i = 0; i < parsedErrors.length; i++) {
    if (!first) {
      str += '\n';
      str += typeof cause !== 'string' && cause.prefix ? cause.prefix : 'Caused by: ';
    }
    const cause = parsedErrors[i];

    str += printError(cause, options);
    first = false;
  }

  return str;
}

function cleanErrors(errors, predicate = isInternalFrame) {
  for (let i = 0; i < errors.length; i++) {
    cleanError(errors[i], predicate);
  }
}

module.exports = { printErrors, parseErrors, cleanErrors };
