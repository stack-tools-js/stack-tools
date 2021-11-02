const { Grammar } = require('nearley');
const isError = require('iserror');

const base = require('../errors');
const { parseUnambiguous } = require('./internal/nearley/util.js');
const CompiledErrorGrammar = require('./internal/nearley/error.js');
const { buildError, buildChainedError } = require('./internal/error');
const { parseError, printError, cleanError } = require('./error.js');
const { isInternalFrame } = require('./frame.js');

const ErrorsGrammar = Grammar.fromCompiled(CompiledErrorGrammar);
const ErrorGrammar = Grammar.fromCompiled({ ...CompiledErrorGrammar, ParserStart: 'Error' });

function __parseError(error, options = {}) {
  const { strict = false } = options;
  const parserErrors = strict
    ? [parseUnambiguous(ErrorGrammar, error)]
    : parseUnambiguous(ErrorsGrammar, error);

  return parserErrors.map((error, i) => {
    return i === 0 ? buildError(error) : buildChainedError(error);
  });
}

function parseErrors(errors, options = {}) {
  if (isError(errors)) {
    const chain = [];

    for (let cause = errors; cause; cause = cause.cause) {
      const errorChain = __parseError(cause.stack, options);
      chain.push(...errorChain);
    }
    return chain;
  } else {
    return __parseError(errors);
  }
}

function __printErrors(errors) {
  let str = '';
  for (let i = 0; i < errors.length; i++) {
    const error = errors[i];

    if (i > 0) {
      str += '\n';
      const { prefix = 'Caused by' } = error;
      str += `${prefix}:`;
      if (error.message) str += ' ';
    }

    str += printError(error);
  }

  return str;
}

function printErrors(errors, options) {
  if (isError(errors)) {
    const chain = [];
    for (let cause = errors; cause; cause = cause.cause) {
      chain.push(parseError(cause, options));
    }
    return __printErrors(chain);
  } else {
    return __printErrors(errors);
  }
}

function cleanErrors(errors, predicate = isInternalFrame) {
  for (let i = 0; i < errors.length; i++) {
    cleanError(errors[i], predicate);
  }
  return errors;
}

module.exports = {
  ...base,
  parseErrors,
  printErrors,
  cleanErrors,
};
