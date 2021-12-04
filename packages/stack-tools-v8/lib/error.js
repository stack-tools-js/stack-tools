const { Grammar } = require('nearley');
const isError = require('iserror');
const { parseError: baseParseError, printError: basePrintError } = require('stack-tools');

const { parseUnambiguous } = require('./internal/nearley/util.js');
const CompiledErrorGrammar = require('./internal/nearley/error.js');
const { parseFrames } = require('./internal/error.js');
const { parseHeader } = require('./internal/header.js');
const { isInternalFrame } = require('./frame.js');
const { printNode, isNode } = require('./visit.js');

const ErrorsGrammar = Grammar.fromCompiled(CompiledErrorGrammar);
const ErrorGrammar = Grammar.fromCompiled({ ...CompiledErrorGrammar, ParserStart: 'Error' });

function __parseError(error, options = {}) {
  const { strict = false } = options;
  const parsedError = strict
    ? parseUnambiguous(ErrorGrammar, error)
    : parseUnambiguous(ErrorsGrammar, error).errors[0];
  const { type, header, frames } = parsedError;

  return {
    type,
    ...parseHeader(header),
    frames: parseFrames(frames, options),
  };
}

function parseError(error, options = {}) {
  const { strict = false, frames = true, parseFrames = true } = options;
  if (isError(error)) {
    if (strict && (!parseFrames || !frames || !error.stack)) {
      return baseParseError(error, { frames });
    } else {
      const { prefix, frames } = __parseError(error.stack, options);
      return {
        // Ensure that error.name and error.message overwrite the header of error.stack
        ...baseParseError(error, { frames: false }),
        prefix,
        frames,
      };
    }
  } else if (typeof error === 'string') {
    return __parseError(error, options);
  } else if (isNode(error)) {
    return baseParseError(error);
  } else {
    throw new TypeError(
      'error argument to parseError must be an Error, string, or parseError(error)',
    );
  }
}

function printError(error, options = {}) {
  const { strict, frames } = options;
  if (isError(error)) {
    if (strict) {
      return basePrintError(error, { frames });
    } else {
      return printNode(parseError(error, options));
    }
  } else if (isNode(error, 'ErrorChain')) {
    return printNode(error, options);
  } else {
    throw new TypeError('error argument to printError must be an Error, or parseError(error)');
  }
}

function __cleanError(error, predicate) {
  const { frames } = error;
  if (frames) {
    const cleaned = frames.filter((frame) => !predicate(frame));
    if (frames.length && !cleaned.length) {
      cleaned.push({ type: 'OmittedFrame' });
    }
    error.frames = cleaned;
  }
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
  parseError,
  printError,
  cleanError,
};
