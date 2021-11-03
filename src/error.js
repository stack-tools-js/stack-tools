const isError = require('iserror');

const { printHeader } = require('./internal/header.js');

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
  return printHeader(error);
}

function __printFrames(error) {
  return error.frames.join('\n');
}

function printFrames(error) {
  return __printFrames(isError(error) ? parseError(error) : error);
}

function __printError(error) {
  const { frames } = error;
  const header = printHeader(error);

  return frames.length ? `${header}\n${frames.join('\n')}` : header;
}

function printError(error) {
  return __printError(isError(error) ? parseError(error) : error);
}

module.exports = { parseError, printErrorHeader, printFrames, printError };
