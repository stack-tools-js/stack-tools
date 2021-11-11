const { Grammar } = require('nearley');

const { parseFrameStrict } = require('./internal/frame-strict.js');
const { parse } = require('./internal/nearley/util.js');
const CompiledFrameGrammar = require('./internal/nearley/frame.js');
const { visit } = require('./visit.js');

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

function scoreCallSite(callSite, p = 0) {
  const { call, site } = callSite;

  // Use powers of two to ensure that scores are unambiguous
  let score = 0;

  if (call) {
    score += 2 ^ (p + 7);

    const { constructor, method, function: function_ } = call;

    if (constructor) score += 2 ^ (p + 6);
    if (method !== function_) score += 2 ^ (p + 5);
    if (function_) score += 2 ^ (p + 4);
    if (isBalanced(function_)) score += 2 ^ (p + 3);
  }

  if (site) {
    if (site.type !== 'FileSite') {
      score += 2 ^ (p + 2);
    } else {
      if (site.locator.type === 'AnonymousLocator') {
        score += 2 ^ (p + 1);
      } else if (isBalanced(site.locator.path)) {
        score += 2 ^ p;
      }
    }
  }
  return score;
}

function parseFrame(str) {
  try {
    return parseFrameStrict(str);
  } catch (e) {
    // The ambiguous grammar is more powerful, but returns multiple interpretations
    const frames = parse(FrameGrammar, str);

    // Therefore we must make some decisions about what is most likely to be correct
    let best = null;
    let bestScore = -1;
    let score = 0;

    for (const frame of frames) {
      switch (frame.type) {
        case 'CallSiteFrame':
          score = scoreCallSite(frame.callSite);
          break;
        case 'EvalFrame':
          score = scoreCallSite(frame.callSite) + scoreCallSite(frame.evalCallSite, 8);
          break;
      }

      if (score > bestScore) {
        bestScore = score;
        best = frame;
      }
    }

    return best;
  }
}

function printFrame(frame) {
  return visit(frame);
}

function isInternalFrame(frame) {
  const siteType = frame.callSite.site.type;
  return siteType === 'NativeSite' || siteType === 'IndexSite';
}

module.exports = { parseFrame, printFrame, isInternalFrame };
