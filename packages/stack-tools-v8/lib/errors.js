const { Grammar } = require('nearley');
const isError = require('iserror');
const {
  printErrors: basePrintErrors,
  parseErrors: baseParseErrors,
  getErrors,
} = require('stack-tools');

const { parseUnambiguous } = require('./internal/nearley/util.js');
const CompiledErrorGrammar = require('./internal/nearley/error.js');
const { parseFrames } = require('./internal/error.js');
const { parseHeader, parseChainedHeader } = require('./internal/header.js');
const { cleanError } = require('./error.js');
const { isInternalFrame } = require('./frame.js');
const { printNode, isNode } = require('./visit.js');

const ErrorsGrammar = Grammar.fromCompiled(CompiledErrorGrammar);
const ErrorGrammar = Grammar.fromCompiled({ ...CompiledErrorGrammar, ParserStart: 'Error' });

function __parseError(error, options = {}) {
  const { strict = false } = options;

  const parsedErrors = strict
    ? [parseUnambiguous(ErrorGrammar, error)]
    : parseUnambiguous(ErrorsGrammar, error);

  parsedErrors.errors = parsedErrors.errors.map((error, i) => {
    const { type, header } = error;
    const parsedHeader = i === 0 ? parseHeader(header) : parseChainedHeader(header);

    return {
      type,
      ...parsedHeader,
      frames: parseFrames(error.frames, options),
    };
  });

  return parsedErrors;
}

function parseErrors(errors, options = {}) {
  const { frames } = options;

  let parsedErrors;
  if (isError(errors)) {
    parsedErrors = getErrors(errors).flatMap((error) => __parseError(error.stack, options).errors);
  } else if (typeof errors === 'string') {
    parsedErrors = __parseError(errors, options).errors;
  } else if (isNode(errors, 'ErrorChain')) {
    return baseParseErrors(errors, { frames });
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
