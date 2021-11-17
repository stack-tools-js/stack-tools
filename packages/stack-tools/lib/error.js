const isError = require('iserror');

const { isNode, printNode } = require('./visit.js');

// Stolen from escape-string-regexp © sindresorhus
// It was easier to copy the code than transpile to cjs inside node_modules
function escapeRegex(string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

function parseError(error, options = {}) {
  const { frames = true } = options;

  if (isError(error)) {
    const { name, displayName, message, stack } = error;

    const node = {
      type: 'Error',
      name: { type: 'ErrorName', name },
      message: { type: 'ErrorMessage', message },
      frames: undefined,
    };

    if (stack) {
      const names = [name, 'Error'];
      // Some older browsers print displayName instead of name
      if (displayName) names.push(displayName);

      const nameExp = new RegExp(`^(${names.map((n) => escapeRegex(n)).join('|')}):`);
      const nameMatch = nameExp.exec(stack);

      if (nameMatch) {
        const stackName = nameMatch[1];
        node.name.name = stackName;

        if (frames) {
          const headerExp = new RegExp(`^${escapeRegex(stackName)}: ${escapeRegex(message)}\n`);
          const headerMatch = headerExp.exec(stack);

          if (headerMatch) {
            node.frames = stack
              .slice(headerMatch[0].length)
              .split('\n')
              .map((text) => ({
                type: 'TextFrame',
                text,
              }));
          }
        }
      }
    }
    return node;
  } else if (isNode(error)) {
    return frames ? error : { ...error, frames: undefined };
  } else {
    throw new Error('error argument to parseError must be an Error or parseError(Error)');
  }
}

function replaceMessage(error, message) {
  if (isError(error)) {
    const message_ = typeof message === 'function' ? message(error.message) : message;
    if (error.stack) {
      const parsedError = parseError(error, { frames: false });
      const oldHeader = printError(parsedError);
      error.stack =
        printError(
          Object.assign({}, parsedError, {
            message: Object.assign({}, parsedError.message, { message: message_ }),
          }),
        ) + error.stack.replace(new RegExp(`^${escapeRegex(oldHeader)}`), '');
    }
    error.message = message_;

    return error;
  } else {
    throw new Error('error argument to replaceMessage must be an Error');
  }
}

function printError(error, options = {}) {
  const { frames = true } = options;
  if (isError(error)) {
    if (error.stack && frames) {
      return error.stack;
    } else {
      return printNode(parseError(error, options));
    }
  } else if (isNode(error, 'Error')) {
    return printNode(error, options);
  } else {
    throw new Error('error argument to printError must be an Error or parseError(error)');
  }
}

module.exports = { parseError, replaceMessage, printError };
