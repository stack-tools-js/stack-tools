const { Grammar } = require('nearley');
const isError = require('iserror');

const { parseUnambiguous } = require('./internal/nearley/util.js');
const CompiledErrorGrammar = require('./internal/nearley/error.js');
const { parseFrame, printFrame, isInternalFrame } = require('./frame.js');

const ErrorsGrammar = Grammar.fromCompiled(CompiledErrorGrammar);
const ErrorGrammar = Grammar.fromCompiled({ ...CompiledErrorGrammar, ParserStart: 'Error' });

function parseError(error, options = {}) {
  const { strict = false } = options;

  let stack;

  if (isError(error)) {
    ({ stack } = error);
  } else if (typeof error === 'string') {
    stack = error;
  } else {
    throw new TypeError(
      `error argument to parseError must be an Error or string but received \`${
        error == null ? `${error}` : typeof error
      }\``,
    );
  }

  if (strict) {
    const error = parseUnambiguous(ErrorGrammar, stack);

    return {
      ...error,
      stack: error.stack.map((frame) => parseFrame(frame)),
    };
  } else {
    const errors = parseUnambiguous(ErrorsGrammar, stack);

    return errors.map((error) => ({
      ...error,
      stack: error.stack.map((frame) => parseFrame(frame)),
    }));
  }
}

function printError(error, options) {
  let parsedError;

  if (isError(error)) {
    let { stack, message } = error;
    if (!stack) {
      parsedError = { message, stack };
    } else {
      const errors = parseErrors(stack, options);

      parsedError = errors[0];
    }
  } else {
    parsedError = error;
  }

  const { message = 'Error', stack } = parsedError;

  const printedStack =
    typeof error.stack === 'string'
      ? error.stack
      : stack.map((frame) => printFrame(frame)).join('\n');

  return '' + message + '\n' + printedStack;
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

module.exports = { printError, parseError, cleanError };
