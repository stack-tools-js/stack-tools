const { parseFrame } = require('../frame.js');

function buildError(parserError) {
  let { header, frames } = parserError;

  let prefix = '';

  const colonIdx = header.indexOf(':');
  if (colonIdx >= 0) {
    prefix = header.slice(0, colonIdx);
    header = header.slice(colonIdx + 1).trimLeft();
  }

  const message = header;

  if (prefix) {
    return { name: prefix, message, frames };
  } else {
    return { name: 'Error', message: '', frames };
  }
}

function buildChainedError(parserError) {
  let { header } = parserError;

  let prefix1 = '';
  let prefix2 = '';

  const colonIdx = header.indexOf(':');
  if (colonIdx >= 0) {
    prefix1 = header.slice(0, colonIdx);
    header = header.slice(colonIdx + 1).trimLeft();

    const colon2Idx = header.indexOf(':');
    if (colon2Idx >= 0) {
      prefix2 = header.slice(0, colon2Idx);
      header = header.slice(colon2Idx + 1).trimLeft();
    }
  }

  const message = header;
  const frames = parserError.frames.map((frame) => parseFrame(frame));

  if (prefix1 && prefix2) {
    return { name: prefix2, message, frames, prefix: prefix1 };
  } else if (prefix1) {
    return { name: '', message, frames, prefix: prefix1 };
  } else {
    return { name: '', message: '', frames, prefix: '' };
  }
}

module.exports = { buildError, buildChainedError };
