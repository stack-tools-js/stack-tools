const { printHeader } = require('../../internal/header.js');

function parseHeader(header) {
  let name = '';
  let message = header;

  const colonIdx = message.indexOf(': ');
  if (colonIdx >= 0) {
    name = message.slice(0, colonIdx).trim();
    message = message.slice(colonIdx + 2).trim();
  }

  return { name, message };
}

function parseChainedHeader(header) {
  let prefix = '';
  let name = '';
  let message = header;

  const colonIdx = message.indexOf(':');
  if (colonIdx >= 0) {
    prefix = message.slice(0, colonIdx);
    message = message.slice(colonIdx + 1).trimLeft();

    const colon2Idx = message.indexOf(':');
    if (colon2Idx >= 0) {
      name = message.slice(0, colon2Idx);
      message = message.slice(colon2Idx + 1).trimLeft();
    } else {
      name = message;
      message = '';
    }
  }

  if (prefix && name) {
    return { name, message, prefix };
  } else if (prefix) {
    return { name: '', message, prefix };
  } else {
    return { name: '', message: '', prefix: '' };
  }
}

function printChainedHeader(error) {
  const { prefix = 'Caused by', name, message } = error;

  return name || message ? `${prefix}: ${printHeader(error)}` : `${prefix}:`;
}

module.exports = { parseHeader, parseChainedHeader, printHeader, printChainedHeader };
