const { Grammar } = require('nearley');
const isError = require('iserror');

const base = require('../errors');
const { parseUnambiguous } = require('./internal/nearley/util.js');
const CompiledErrorGrammar = require('./internal/nearley/error.js');
const { parseError, printFrames, cleanError } = require('./error.js');
const { parseFrame, isInternalFrame } = require('./frame.js');

const ErrorsGrammar = Grammar.fromCompiled(CompiledErrorGrammar);
const ErrorGrammar = Grammar.fromCompiled({ ...CompiledErrorGrammar, ParserStart: 'Error' });

function __parseError(error, options = {}) {
  const { strict = false } = options;
  const parsedErrors = strict
    ? [parseUnambiguous(ErrorGrammar, error)]
    : parseUnambiguous(ErrorsGrammar, error);

  return parsedErrors.map((error) => {
    const frames = error.frames.map((frame) => parseFrame(frame));

    return { ...error, frames };
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
    const { prefix, header } = error;

    if (i > 0) {
      str += '\n';
      if (header && prefix) {
        str += `${prefix}: ${header}`;
      } else if (header || prefix) {
        str += header || `${prefix}:`;
      } else {
        str += 'Caused by:';
      }
    } else {
      str += header;
    }

    str += '\n';

    str += printFrames(error);
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
