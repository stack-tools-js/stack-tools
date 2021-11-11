const { Grammar } = require('nearley');
const isError = require('iserror');
const { printErrors: basePrintErrors, getErrorChain } = require('stack-tools');

const { parseUnambiguous } = require('./internal/nearley/util.js');
const CompiledErrorGrammar = require('./internal/nearley/error.js');
const { parseHeader, parseChainedHeader } = require('./internal/header.js');
const { cleanError } = require('./error.js');
const { parseFrame, isInternalFrame } = require('./frame.js');
const { visit, isNode } = require('./visit.js');

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
  let errors_;
  if (isError(errors)) {
    errors_ = getErrorChain(errors);
  } else if (Array.isArray(errors)) {
    errors_ = errors;
  } else if (typeof errors === 'string') {
    errors_ = [errors];
  } else {
    throw new TypeError(
      'errors argument to printErrors must be an Error, string, or array of errors',
    );
  }

  const results = [];
  let allNodes = true;
  for (let i = 0; i < errors_.length; i++) {
    const error = errors_[i];
    if (isNode(error)) {
      results.push(error);
    } else {
      allNodes = false;
      if (typeof error === 'string') {
        results.push(...__parseError(error, options));
      } else if (isError(error)) {
        results.push(...__parseError(error.stack, options));
      }
    }
  }
  return allNodes ? errors : results;
}

function printErrors(errors, options = {}) {
  const { strict = false } = options;
  if (isError(errors)) {
    return strict ? basePrintErrors(errors) : visit.ErrorChain(parseErrors(errors, options), visit);
  } else if (Array.isArray(errors)) {
    return visit.ErrorChain(parseErrors(errors, options), visit);
  } else {
    throw new TypeError('errors argument to printErrors must be an Error or array of errors');
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
