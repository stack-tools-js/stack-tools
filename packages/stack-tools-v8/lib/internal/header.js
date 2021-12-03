function parseHeader(header) {
  let name = '';
  let message = header;

  const cnMatch = /:(?: |$)/.exec(message);
  if (cnMatch) {
    name = message.slice(0, cnMatch.index);
    message = message.slice(cnMatch.index + cnMatch[0].length);
  }

  return {
    prefix: undefined,
    name: name ? { type: 'ErrorName', name } : undefined,
    message: message ? { type: 'ErrorMessage', message } : undefined,
  };
}

function parseChainedHeader(header) {
  const nlIdx = header.indexOf('\n');
  const messageExtra = nlIdx >= 0 ? header.slice(nlIdx + 1) : '';
  let message = nlIdx >= 0 ? header.slice(0, nlIdx) : header;
  let prefix = '';
  let name = '';

  const cnMatch = /:(?: |$)/.exec(message);
  if (cnMatch) {
    prefix = message.slice(0, cnMatch.index);
    message = message.slice(cnMatch.index + cnMatch[0].length);

    const cn2Match = /:(?: |$)/.exec(message);
    if (cn2Match) {
      name = message.slice(0, cn2Match.index);
      message = message.slice(cn2Match.index + cn2Match[0].length);
    } else {
      name = message;
      message = '';
    }
  }

  if (!prefix) {
    throw new Error(
      // eslint-disable-next-line no-template-curly-in-string
      `stack line is neither a frame or a chained error header: \`${header}\``,
    );
  } else if (/^caused by$/i.test(prefix)) {
    prefix = 'Caused by';
  }

  if (messageExtra) {
    message = `${message}\n${messageExtra}`;
  }

  return {
    prefix: prefix ? { type: 'ErrorPrefix', prefix } : undefined,
    name: name ? { type: 'ErrorName', name } : undefined,
    message: message ? { type: 'ErrorMessage', message } : undefined,
  };
}

module.exports = {
  parseHeader,
  parseChainedHeader,
};
