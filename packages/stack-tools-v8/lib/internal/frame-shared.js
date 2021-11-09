const moo = require('moo');

const URIexp = /^(\w+):\/\//;

const lexer = moo.compile({
  SP: /[ \t]+/,
  CN: ':',
  LB: '[', // Braces
  RB: ']',
  LP: '(', // Parens
  RP: ')',
  LA: '<', // Angle brackets
  RA: '>',
  Number: { match: /\d+/, value: (str) => parseInt(str, 10) },
  Fragment: /[^()<>[\]: \d\t\n]+/,
});

const buildFrame = (evalOrigin, site, eval_) => {
  return {
    call: {
      constructor: false,
      async: false,
      function: evalOrigin,
      method: evalOrigin,
    },
    site,
    eval: eval_,
  };
};

const buildCallSite = (call, site) => ({ call, site });

const buildCall = (kw, fn, method = fn) => {
  return {
    constructor: kw === 'new',
    async: kw === 'async',
    function: fn,
    method,
  };
};

const buildFileSite = (pathOrUri) => {
  const URImatch = URIexp.exec(pathOrUri);
  if (URImatch) {
    const uri = encodeURI(pathOrUri);
    const cnIdx = uri.indexOf(':');
    const scheme = uri.slice(0, cnIdx);
    const path = uri.slice(cnIdx + 3);
    return { type: 'uri', scheme, path };
  } else {
    return { type: 'path', path: pathOrUri };
  }
};

module.exports = { lexer, buildFrame, buildCallSite, buildCall, buildFileSite };
