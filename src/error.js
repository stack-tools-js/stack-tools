const isError = require('iserror');

// Stolen from escape-string-regexp © sindresorhus
// It was easier to copy the code than transpile to cjs inside node_modules
function escapeRegex(string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

function parseError(error) {
  if (isError(error)) {
    const { name, displayName, message, stack } = error;

    const header = printErrorHeader(error);
    const names = [name, 'Error'];
    // Some older browsers print displayName instead of name
    if (displayName) names.push(displayName);

    const headerExp = new RegExp(
      `(?:${names.map((n) => escapeRegex(n)).join('|')}): ${escapeRegex(message)}\n`,
    );
    const headerMatch = headerExp.exec(stack);
    const headerlessStack = headerMatch ? stack.slice(headerMatch[0].length) : stack;
    const frames = headerlessStack.split('\n');

    return { header, frames };
  } else {
    throw new Error('error argument to parseError must be an Error');
  }
}

function __printErrorHeader(error) {
  return error.header;
}

function printNameAndMessage(name, message) {
  let header = '';
  header += name || 'Error';
  if (message) header += `: ${message}`;
  return header;
}

function printErrorHeader(error) {
  if (isError(error)) {
    const { name, message } = error;

    return printNameAndMessage(name, message);
  } else {
    return __printErrorHeader(error);
  }
}

function __printError(error) {
  const { header, frames } = error;

  return frames.length ? `${header}\n${error.frames.join('\n')}` : header;
}

function printError(error) {
  return __printError(isError(error) ? parseError(error) : error);
}

module.exports = { parseError, printErrorHeader, printError };
