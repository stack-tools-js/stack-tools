const { Grammar } = require('nearley');
const isError = require('iserror');

const { parseUnambiguous } = require('./internal/nearley/util.js');
const CompiledErrorGrammar = require('./internal/nearley/error.js');
const { parseFrame, printFrame, isInternalFrame } = require('./frame.js');
const base = require('../error');

const ErrorsGrammar = Grammar.fromCompiled(CompiledErrorGrammar);
const ErrorGrammar = Grammar.fromCompiled({ ...CompiledErrorGrammar, ParserStart: 'Error' });

function __parseError(error, options = {}) {
  const { strict = false } = options;
  const parsedError = strict
    ? parseUnambiguous(ErrorGrammar, error)
    : parseUnambiguous(ErrorsGrammar, error)[0];

  const stack = parsedError.stack.map((frame) => parseFrame(frame));

  return { ...error, stack };
}

function parseError(error, options) {
  if (isError(error)) {
    return __parseError(error.stack, options);
  } else if (typeof error === 'string') {
    return __parseError(error, options);
  } else {
    throw new TypeError(
      `error argument to parseError must be an Error or string but received \`${
        error == null ? `${error}` : typeof error
      }\``,
    );
  }
}

function __printError(error) {
  const header = __printErrorHeader(error);
  const stack = __printFrames(error);
  return stack ? `${header}\n${stack}` : stack;
}

function printError(error, options) {
  if (isError(error)) {
    const parsedError = __parseError(error, options);
    return __printError(parsedError);
  } else {
    return __printError(error);
  }
}

function __printErrorHeader(error) {
  return error.message;
}

function printErrorHeader(error) {
  if (isError(error)) {
    return base.printErrorHeader(error);
  } else {
    return __printErrorHeader(error);
  }
}

function __printFrames(error) {
  const { stack } = error;
  return typeof stack === 'string' ? stack : stack.map((frame) => printFrame(frame)).join('\n');
}

function printFrames(error) {
  if (isError(error)) {
    return base.printFrames(error);
  } else {
    return __printFrames(error);
  }
}

function cleanError(error, predicate = isInternalFrame) {
  const { stack } = error;
  const cleaned = stack.filter((frame) => predicate(frame));
  if (stack.length && !cleaned.length) {
    cleaned.push(buildCallSite(null, { type: 'omitted' }));
  }
  error.stack = cleaned;
  return error;
}

module.exports = {
  ...base,
  parseError,
  printError,
  printErrorHeader,
  printFrames,
  cleanError,
};
