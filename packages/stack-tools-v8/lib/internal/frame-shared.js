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

const buildFrame = (callSite) => {
  return { type: 'CallSiteFrame', callSite, evalCallSite: undefined };
};

const buildEvalFrame = (evalOrigin, site, eval_) => {
  return {
    type: 'CallSiteFrame',
    callSite: {
      call: {
        type: 'Call',
        constructor: false,
        async: false,
        function: evalOrigin,
        method: evalOrigin,
      },
      site,
    },
    evalCallSite: eval_,
  };
};

const buildCallSite = (call, site) => ({ call, site });

const buildCall = (kw, fn, method = fn) => {
  return {
    type: 'Call',
    constructor: kw === 'new',
    async: kw === 'async',
    function: fn,
    method,
  };
};

const buildLocator = (pathOrUri) => {
  const URImatch = URIexp.exec(pathOrUri);
  if (URImatch) {
    const uri = encodeURI(pathOrUri);
    const cnIdx = uri.indexOf(':');
    const scheme = uri.slice(0, cnIdx);
    const path = uri.slice(cnIdx + 3);
    return { type: 'URILocator', scheme, path };
  } else {
    return { type: 'PathLocator', path: pathOrUri };
  }
};

module.exports = {
  lexer,
  buildFrame,
  buildEvalFrame,
  buildCallSite,
  buildCall,
  buildLocator,
};
