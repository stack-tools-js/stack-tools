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
    const headerMatch = headerExp.exec(stack);
    const headerlessStack = headerMatch ? stack.slice(headerMatch[0].length) : stack;
    const frames = headerlessStack.split('\n');

    return { name, message, frames };
  } else {
    throw new Error('error argument to parseError must be an Error');
  }
}

function printErrorHeader(error) {
  const { name, message } = error;
  // prettier-ignore
  return (
    name && message
      ? `${name}: ${message}`
      : message || name
        ? message || `${name}:`
        : 'Error:'
  );
}

function __printError(error) {
  const { frames } = error;
  const header = printErrorHeader(error);

  return frames.length ? `${header}\n${error.frames.join('\n')}` : header;
}

function printError(error) {
  return __printError(isError(error) ? parseError(error) : error);
}

module.exports = { parseError, printErrorHeader, printError };
