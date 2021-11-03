const { Grammar } = require('nearley');

const { parseFrameStrict } = require('./internal/frame-strict.js');
const { parse } = require('./internal/nearley/util.js');
const CompiledFrameGrammar = require('./internal/nearley/frame.js');

const FrameGrammar = Grammar.fromCompiled(CompiledFrameGrammar);

const isBalanced = (str) => {
  let parens = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str[i];
    if (chr === '(') {
      parens++;
    } else if (chr === ')') {
      if (parens > 0) {
        parens--;
      } else {
        return false;
      }
    }
  }
  return parens === 0;
};

function parseFrame(str) {
  try {
    return parseFrameStrict(str);
  } catch (e) {
    // The ambiguous grammar is more powerful, and may be able to parse this

    const results = parse(FrameGrammar, str);

    // The frame grammar is fundamentally ambiguous
    // We must make some decisions about what is most likely to be correct
    let best = null;
    let bestScore = -1;
    for (const result of results) {
      const { eval: eval_, call, site } = result;

      let score = 0;
      // Use powers of two to ensure that scores are unambiguous

      if (eval_) score += 32;
      if (call && call.constructor) score += 16;
      if (call && call.method !== call.function) score += 8;
      if (call && call.function) score += 4;
      if (
        site &&
        (site.type === 'path' || site.type === 'uri') &&
        isBalanced(site.type === 'path' ? site.path : site.uri)
      )
        score += 2;

      if (score > bestScore) {
        bestScore = score;
        best = result;
      }
    }

    return best;
  }
}

function printCall(call) {
  const parts = [];

  if (call.async) parts.push('async');
  if (call.constructor) parts.push('new');
  parts.push(call.function);
  if (call.method !== call.function) parts.push(`[as ${call.method}]`);

  return parts.join(' ');
}

function printSite(site) {
  let str = '';
  switch (site.type) {
    case 'anonymous':
      str += '<anonymous>';
      if (site.line && site.column) {
        str += `:${site.line}:${site.column}`;
      }
      break;
    case 'native':
      str += 'native';
      break;
    case 'path':
      str += `${site.path}:${site.line}:${site.column}`;
      break;
    case 'uri': {
      const file = decodeURI(`${site.scheme}://${site.path}`);
      str += `${file}:${site.line}:${site.column}`;
      break;
    }
    case 'index':
      str += `index ${site.index}`;
      break;
  }

  return str;
}

function printCallSite(callSite) {
  const { call, site } = callSite;
  const parts = [];

  if (call) parts.push(printCall(call));
  if (site) parts.push(call ? `(${printSite(site)})` : printSite(site));

  return parts.join(' ');
}

function printEval(callSite, evalCallSite) {
  let str = '';

  str += callSite.call.function;

  str += ' (';

  str += `eval at ${printCallSite(evalCallSite)}`;

  if (callSite.site) str += `, ${printSite(callSite.site)}`;

  str += ')';

  return str;
}

function printFrame(frame) {
  if (typeof frame === 'string') return frame;

  if (frame.call === null && frame.site.type === 'omitted') {
    return `    at <omitted>`;
  }

  return `    at ${frame.eval ? printEval(frame, frame.eval) : printCallSite(frame)}`;
}

function isInternalFrame(frame) {
  return frame.site.type === 'native';
}

module.exports = { parseFrame, printFrame, isInternalFrame };
