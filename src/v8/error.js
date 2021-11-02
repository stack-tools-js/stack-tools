const { Grammar } = require('nearley');
const isError = require('iserror');

const { parseUnambiguous } = require('./internal/nearley/util.js');
const CompiledErrorGrammar = require('./internal/nearley/error.js');
const { buildCallSite } = require('./internal/frame-shared.js');
const { printFrame, isInternalFrame } = require('./frame.js');
const { buildError } = require('./internal/error.js');
const base = require('../error.js');

const ErrorsGrammar = Grammar.fromCompiled(CompiledErrorGrammar);
const ErrorGrammar = Grammar.fromCompiled({ ...CompiledErrorGrammar, ParserStart: 'Error' });

function __parseError(error, options = {}) {
  const { strict = false } = options;
  const parserError = strict
    ? parseUnambiguous(ErrorGrammar, error)
    : parseUnambiguous(ErrorsGrammar, error)[0];

  return buildError(parserError, options);
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
  const header = printErrorHeader(error);
  const frames = __printFrames(error);
  return frames ? `${header}\n${frames}` : frames;
}

function printError(error, options) {
  if (isError(error)) {
    const parsedError = __parseError(error, options);
    return __printError(parsedError);
  } else {
    return __printError(error);
  }
}

function printErrorHeader(error) {
  const { name, message } = error;

  const parts = [];

  if (name) parts.push(name);
  if (message) parts.push(message);

  return parts.length === 0 ? 'Error:' : parts.join(': ');
}

function __printFrames(error) {
  const { frames } = error;
  return typeof frames === 'string' ? frames : frames.map((frame) => printFrame(frame)).join('\n');
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
