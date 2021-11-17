const { Grammar } = require('nearley');
const isError = require('iserror');
const { printErrors: basePrintErrors, getErrors } = require('stack-tools');

const { parseUnambiguous } = require('./internal/nearley/util.js');
const CompiledErrorGrammar = require('./internal/nearley/error.js');
const { parseHeader, parseChainedHeader } = require('./internal/header.js');
const { cleanError } = require('./error.js');
const { parseFrame, isInternalFrame } = require('./frame.js');
const { printNode, isNode } = require('./visit.js');

const ErrorsGrammar = Grammar.fromCompiled(CompiledErrorGrammar);
const ErrorGrammar = Grammar.fromCompiled({ ...CompiledErrorGrammar, ParserStart: 'Error' });

function __parseError(error, options = {}) {
  const { strict = false, frames = true } = options;

  const parsedErrors = strict
    ? [parseUnambiguous(ErrorGrammar, error)]
    : parseUnambiguous(ErrorsGrammar, error);

  return parsedErrors.map((error, i) => {
    const { type, header, frames: textFrames } = error;
    const parsedHeader = i === 0 ? parseHeader(header) : parseChainedHeader(header);

    return {
      type,
      ...parsedHeader,
      frames: frames ? textFrames.map((frame) => parseFrame(frame)) : undefined,
    };
  });
}

function parseErrors(errors, options = {}) {
  const { frames } = options;

  let parsedErrors;
  if (isError(errors)) {
    parsedErrors = getErrors(errors).flatMap((error) => __parseError(error.stack, options));
  } else if (typeof errors === 'string') {
    parsedErrors = __parseError(errors, options);
  } else if (isNode(errors, 'ErrorChain')) {
    parsedErrors = errors.errors;
    if (frames || parsedErrors.every((error) => !error.frames)) {
      return errors;
    } else {
      parsedErrors = parsedErrors.map((error) => ({ ...error, frames: undefined }));
    }
  } else {
    throw new TypeError(
      'errors argument to printErrors must be an Error, string, or array of errors',
    );
  }

  return {
    type: 'ErrorChain',
    errors: parsedErrors,
  };
}

function printErrors(errors, options = {}) {
  const { strict = false, frames = true } = options;
  if (isError(errors)) {
    return strict ? basePrintErrors(errors, { frames }) : printNode(parseErrors(errors, options));
  } else if (isNode(errors, 'ErrorChain')) {
    return printNode(errors, options);
  } else {
    throw new TypeError('errors argument to printErrors must be an Error or parseErrors(errors)');
  }
}

function cleanErrors(errors, predicate = isInternalFrame) {
  if (isNode(errors, 'ErrorChain')) {
    for (let i = 0; i < errors.errors.length; i++) {
      cleanError(errors.errors[i], predicate);
    }
    return errors;
  } else {
    throw new TypeError('errors argument to cleanErrors must be parseErrors(errors)');
  }
}

module.exports = {
  parseErrors,
  printErrors,
  cleanErrors,
};
