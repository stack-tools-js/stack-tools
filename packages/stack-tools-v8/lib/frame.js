const { Grammar } = require('nearley');
const { resolve } = require('path');

const { parseFrameStrict } = require('./internal/frame-strict.js');
const { parse } = require('./internal/nearley/util.js');
const CompiledFrameGrammar = require('./internal/nearley/frame.js');
const { isNode, printNode } = require('./visit.js');

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

function parseFrame(frame) {
  if (typeof frame === 'string') {
    try {
      return parseFrameStrict(frame);
    } catch (e) {
      // The ambiguous grammar is more powerful, but returns multiple interpretations
      const frames = parse(FrameGrammar, frame);

      // Therefore we must make some decisions about what is most likely to be correct
      let best = null;
      let bestScore = -1;
      let score = 0;

      for (const frame of frames) {
        if (frame.type === 'CallSiteFrame') {
          score = scoreCallSite(frame.callSite);
          if (frame.evalCallSite) score += scoreCallSite(frame.evalCallSite, 8);
          /* c8 ignore next 3 */
        } else {
          // We should never reach this spot as only call site frames are ambiguous
        }

        if (score > bestScore) {
          bestScore = score;
          best = frame;
        }
      }

      return best;
    }
  } else if (isNode(frame)) {
    return frame;
  } else {
    throw new TypeError('frame argument to parseFrame must be string or FrameNode');
  }
}

function printFrame(frame) {
  return printNode(frame);
}

function __isInternalSite(site) {
  return site.type === 'NativeSite' || site.type === 'AnonymousSite' || site.type === 'IndexSite';
}

function isInternalFrame(node) {
  if (isNode(node)) {
    if (node.type.endsWith('Frame')) {
      return node.type === 'CallSiteFrame' ? __isInternalSite(node.callSite.site) : false;
    } else if (node.type.endsWith('Site')) {
      return __isInternalSite(node);
    }
  }

  throw new TypeError('node argument to isInternalFrame must be a FrameNode or SiteNode');
}

function __getAbsoluteSitePath(site, options) {
  const { cwd } = options;
  if (site.type === 'FileSite') {
    const { locator } = site;
    if (locator.type === 'PathLocator') {
      const { path } = locator;
      // we have no way of knowing what relative paths are relative to, so discard them
      if (path.startsWith('/')) return path;
      else if (path.startsWith('.')) {
        return resolve(cwd, path);
      }
    } else if (locator.type === 'URILocator') {
      const { scheme, path } = locator;

      if (scheme === 'file') return path;
    }
  }
  return null;
}

function getAbsoluteSitePath(node, options = {}) {
  if (isNode(node)) {
    if (node.type.endsWith('Frame')) {
      return node.type === 'CallSiteFrame'
        ? __getAbsoluteSitePath(node.callSite.site, options)
        : null;
    } else if (node.type.endsWith('Site')) {
      return __getAbsoluteSitePath(node, options);
    }
  }

  throw new TypeError('node argument to getAbsoluteSitePath must be a FrameNode or SiteNode');
}

module.exports = { parseFrame, printFrame, isInternalFrame, getAbsoluteSitePath };
