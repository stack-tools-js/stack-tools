const { Grammar } = require('nearley');
const isError = require('iserror');
const { printErrorHeader } = require('stack-tools');

const { parseUnambiguous } = require('./internal/nearley/util.js');
const CompiledErrorGrammar = require('./internal/nearley/error.js');
const { parseHeader, parseChainedHeader, printChainedHeader } = require('./internal/header.js');
const { parseError, printFrames, cleanError } = require('./error.js');
const { parseFrame, isInternalFrame } = require('./frame.js');

const ErrorsGrammar = Grammar.fromCompiled(CompiledErrorGrammar);
const ErrorGrammar = Grammar.fromCompiled({ ...CompiledErrorGrammar, ParserStart: 'Error' });

function __parseErrors(error, options = {}) {
  const { strict = false } = options;
  const parsedErrors = strict
    ? [parseUnambiguous(ErrorGrammar, error)]
    : parseUnambiguous(ErrorsGrammar, error);

  return parsedErrors.map((error, i) => {
    const { header, frames } = error;
    const parsedHeader = i === 0 ? parseHeader(header) : parseChainedHeader(header);
    const parsedFrames = frames.map((frame) => parseFrame(frame));

    return { ...parsedHeader, frames: parsedFrames };
  });
}

function parseErrors(errors, options = {}) {
  if (isError(errors)) {
    const chain = [];
    for (let cause = errors; cause; cause = cause.cause) {
      chain.push(...__parseErrors(cause.stack, options));
    }
    return chain;
  } else {
    return __parseErrors(errors);
  }
}

function __printErrors(errors) {
  let str = '';
  for (let i = 0; i < errors.length; i++) {
    if (i > 0) str += '\n';
    const error = errors[i];
    const { frames } = error;
    const header = i === 0 ? printErrorHeader(error) : printChainedHeader(error);

    str += frames && frames.length ? `${header}\n${printFrames(error)}` : header;
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
  parseErrors,
  printErrors,
  cleanErrors,
};
