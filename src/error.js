const isError = require('iserror');

function parseError(error) {
  if (isError(error)) {
    const { stack } = error;

    const header = printErrorHeader(error);
    const headerlessStack = stack.startsWith(header + '\n')
      ? stack.slice(header.length + 1)
      : stack;
    const frames = headerlessStack.split('\n');

    return { header, frames };
  } else {
    throw new Error('error argument to parseError must be an Error');
  }
}

function __printErrorHeader(error) {
  return error.header;
}

function printErrorHeader(error) {
  if (isError(error)) {
    const { name, message } = error;

    let header = '';
    header += name || 'Error';
    if (message) header += `: ${message}`;
    return header;
  } else {
    return __printErrorHeader(error);
  }
}

function __printFrames(error) {
  return error.frames.join('\n');
}

function printFrames(error) {
  return __printFrames(isError(error) ? parseError(error) : error);
}

function __printError(error) {
  const { header, frames } = error;

  return frames.length ? `${header}\n${__printFrames(error)}` : header;
}

function printError(error) {
  return __printError(isError(error) ? parseError(error) : error);
}

module.exports = { parseError, printErrorHeader, printFrames, printError };
