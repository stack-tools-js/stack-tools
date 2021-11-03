const { Grammar } = require('nearley');
const isError = require('iserror');

const { parseUnambiguous } = require('./internal/nearley/util.js');
const CompiledErrorGrammar = require('./internal/nearley/error.js');
const { parseHeader, printHeader } = require('./internal/header.js');
const { buildCallSite } = require('./internal/frame-shared.js');
const { parseFrame, printFrame, isInternalFrame } = require('./frame.js');
const base = require('../error.js');

const ErrorsGrammar = Grammar.fromCompiled(CompiledErrorGrammar);
const ErrorGrammar = Grammar.fromCompiled({ ...CompiledErrorGrammar, ParserStart: 'Error' });

function __parseError(error, options = {}) {
  const { strict = false } = options;
  const { header, frames } = strict
    ? parseUnambiguous(ErrorGrammar, error)
    : parseUnambiguous(ErrorsGrammar, error)[0];

  return { ...parseHeader(header), frames: frames.map((frame) => parseFrame(frame)) };
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
  const { frames } = error;
  const header = printHeader(error);

  return frames.length ? `${header}\n${__printFrames(error)}` : header;
}

function printError(error, options) {
  if (isError(error)) {
    const parsedError = parseError(error, options);
    return __printError(parsedError);
  } else {
    return __printError(error);
  }
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

function __cleanError(error, predicate) {
  const { frames } = error;
  const cleaned = frames.filter((frame) => !predicate(frame));
  if (frames.length && !cleaned.length) {
    cleaned.push(buildCallSite(null, { type: 'omitted' }));
  }
  error.frames = cleaned;
  return error;
}

function cleanError(error, predicate = isInternalFrame) {
  if (typeof error === 'string') {
    return printError(__cleanError(parseError(error), predicate));
  } else {
    return __cleanError(error, predicate);
  }
}

module.exports = {
  ...base,
  parseError,
  printError,
  printFrames,
  cleanError,
};
