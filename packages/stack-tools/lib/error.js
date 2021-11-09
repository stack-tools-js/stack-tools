const isError = require('iserror');

// Stolen from escape-string-regexp © sindresorhus
// It was easier to copy the code than transpile to cjs inside node_modules
function escapeRegex(string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

function parseError(error) {
  if (isError(error)) {
    const { name, displayName, message, stack } = error;

    const names = [name, 'Error'];
    // Some older browsers print displayName instead of name
    if (displayName) names.push(displayName);

    const headerExp = new RegExp(
      `(?:${names.map((n) => escapeRegex(n)).join('|')}): ${escapeRegex(message)}\n`,
    );

    if (stack) {
      const headerMatch = headerExp.exec(stack);
      if (headerMatch) {
        return {
          name,
          message,
          frames: stack.slice(headerMatch[0].length).split('\n'),
        };
      }
    }
    return { name, message };
  } else {
    throw new Error('error argument to parseError must be an Error');
  }
}

function replaceMessage(error, message) {
  const { name } = error;
  const message_ = typeof message === 'function' ? message(error.message) : message;
  if (error.stack) {
    const oldHeader = printErrorHeader(error);
    error.stack =
      printErrorHeader({ name, message: message_ }) +
      error.stack.replace(new RegExp(`^${escapeRegex(oldHeader)}`), '');
  }
  error.message = message_;

  return error;
}

function printErrorHeader(error) {
  const { name, message } = error;
  return name && message ? `${name}: ${message}` : message ? `Error: ${message}` : name || 'Error';
}

function __printFrames(error) {
  return error.frames.join('\n');
}

function printFrames(error) {
  return __printFrames(isError(error) ? parseError(error) : error);
}

function __printError(error) {
  const { frames } = error;
  const header = printErrorHeader(error);

  return frames && frames.length ? `${header}\n${frames.join('\n')}` : header;
}

function printError(error) {
  return __printError(isError(error) ? parseError(error) : error);
}

module.exports = { parseError, replaceMessage, printErrorHeader, printFrames, printError };
