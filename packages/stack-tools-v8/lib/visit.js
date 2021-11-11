const { nodeTypes: baseNodeTypes, defaultVisitors: baseVisitors } = require('stack-tools');

const nodeTypes = Object.assign({}, baseNodeTypes, {
  CallSiteFrame: true,
  EvalFrame: true,
  Call: true,
  AnonymousSite: true,
  NativeSite: true,
  FileSite: true,
  IndexSite: true,
  OmittedSite: true,
  AnonymousLocator: true,
  PathLocator: true,
  URILocator: true,
  Position: true,
});

const isNode = (node) => node != null && typeof node === 'object' && nodeTypes[node.type];

function printCallSite(callSite, visit) {
  const { call, site } = callSite;
  const parts = [];

  if (call) parts.push(visit(call));
  if (site) parts.push(call ? `(${visit(site)})` : visit(site));

  return parts.join(' ');
}

const defaultVisitors = Object.assign({}, baseVisitors, {
  ErrorChain(chain, visit) {
    let str = '';
    for (let i = 0; i < chain.length; i++) {
      if (i > 0) str += '\n';
      const error = chain[i];
      const { frames } = error;
      let header;
      if (i === 0) {
        header = visit.ErrorHeader(error, visit);
      } else {
        const { prefix = 'Caused by', name, message } = error;

        header = name || message ? `${prefix}: ${visit.ErrorHeader(error, visit)}` : `${prefix}:`;
      }

      str += frames && frames.length ? `${header}\n${visit.Frames(frames, visit)}` : header;
    }

    return str;
  },
  Frame(frame, visit) {
    return `    at ${visit[frame.type](frame, visit)}`;
  },
  OmittedFrame() {
    return '<omitted>';
  },
  CallSiteFrame(frame, visit) {
    return printCallSite(frame.callSite, visit);
  },
  EvalFrame(frame, visit) {
    const { callSite, evalCallSite } = frame;
    let str = '';

    str += visit(callSite.call);

    str += ' (';

    str += `eval at ${printCallSite(evalCallSite, visit)}`;

    if (callSite.site) str += `, ${visit(callSite.site)}`;

    str += ')';

    return str;
  },
  Call(call) {
    const parts = [];

    if (call.async) parts.push('async');
    if (call.constructor) parts.push('new');
    parts.push(call.function);
    if (call.method !== call.function) parts.push(`[as ${call.method}]`);

    return parts.join(' ');
  },
  Site(site, visit) {
    return visit[site.type](site, visit);
  },
  AnonymousSite() {
    return '<anonymous>';
  },
  NativeSite() {
    return 'native';
  },
  FileSite(site, visit) {
    return `${visit(site.locator)}${visit(site.position)}`;
  },
  IndexSite(site) {
    return `index ${site.index}`;
  },
  Locator(locator, visit) {
    return visit[locator.type](locator, visit);
  },
  AnonymousLocator() {
    return '<anonymous>';
  },
  PathLocator(locator) {
    return locator.path;
  },
  URILocator(locator) {
    return decodeURI(`${locator.scheme}://${locator.path}`);
  },
  Position(pos, visit) {
    return `:${pos.line}:${pos.column}`;
  },
});

function makeVisit(visitors = {}) {
  const visit = (node) => {
    if (node.type.endsWith('Frame')) {
      return visit.Frame(node, visit);
    } else if (node.type.endsWith('Site')) {
      return visit.Site(node, visit);
    } else if (node.type.endsWith('Locator')) {
      return visit.Locator(node, visit);
    } else if (visit[node.type]) {
      return visit[node.type](node, visit);
    } else {
      throw new Error(`Unknown node of type ${node.type}`);
    }
  };

  Object.assign(visit, defaultVisitors, visitors);

  return visit;
}

const visit = makeVisit();

module.exports = { nodeTypes, defaultVisitors, isNode, makeVisit, visit };
