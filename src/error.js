function printErrorHeader(error) {
  const { name, message } = error;

  let header = '';
  header += name || 'Error';
  if (message) header += `: ${message}`;
  return header;
}

function __printFrames(stack, header) {
  return stack.startsWith(header + '\n') ? stack.slice(header.length + 1) : stack;
}

function printFrames(error) {
  return __printFrames(error.stack, printErrorHeader(error));
}

function printError(error) {
  const { stack } = error;

  const header = printErrorHeader(error);

  return stack ? `${header}\n${__printFrames(stack, header)}` : header;
}

module.exports = { printErrorHeader, printFrames, printError };
