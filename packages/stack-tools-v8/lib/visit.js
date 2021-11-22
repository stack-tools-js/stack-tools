const { nodeTypes: baseNodeTypes, Visitor, PrintVisitor } = require('stack-tools');

const nodeTypes = {
  ...baseNodeTypes,
  CallSiteFrame: true,
  EvalFrame: true,
  OmittedFrame: true,
  Call: true,
  AnonymousSite: true,
  NativeSite: true,
  FileSite: true,
  IndexSite: true,
  AnonymousLocator: true,
  PathLocator: true,
  URILocator: true,
  Position: true,
};

const isNode = (node) => node != null && typeof node === 'object' && nodeTypes[node.type];

function printCallSite(callSite, visitor) {
  const { call, site } = callSite;
  const parts = [];

  if (call) parts.push(visitor.visit(call));
  if (site) parts.push(call ? `(${visitor.visit(site)})` : visitor.visit(site));

  return parts.join(' ');
}

class V8PrintVisitor extends PrintVisitor {
  static get suffixMatcher() {
    return /(?:Frame|Site|Locator)$/;
  }

  ErrorChain(chain) {
    let str = '';
    for (let i = 0; i < chain.errors.length; i++) {
      if (i > 0) str += '\n';
      const error = chain.errors[i];
      const { frames } = error;
      let header;
      if (i === 0) {
        header = this.ErrorHeader(error);
      } else {
        const { prefix = 'Caused by', name, message } = error;

        header = name || message ? `${prefix}: ${this.ErrorHeader(error)}` : `${prefix}:`;
      }

      str += frames && frames.length ? `${header}\n${this.Frames(frames)}` : header;
    }

    return str;
  }

  Frame(frame) {
    return `    at ${this[frame.type](frame)}`;
  }

  OmittedFrame() {
    return '<omitted>';
  }

  CallSiteFrame(frame) {
    return printCallSite(frame.callSite, this);
  }

  EvalFrame(frame) {
    const { callSite, evalCallSite } = frame;
    let str = '';

    str += this.visit(callSite.call);

    str += ' (';

    str += `eval at ${printCallSite(evalCallSite, this)}`;

    if (callSite.site) str += `, ${this.visit(callSite.site)}`;

    str += ')';

    return str;
  }

  Call(call) {
    const parts = [];

    if (call.async) parts.push('async');
    if (call.constructor) parts.push('new');
    parts.push(call.function);
    if (call.method !== call.function) parts.push(`[as ${call.method}]`);

    return parts.join(' ');
  }

  Site(site) {
    return this[site.type](site);
  }

  AnonymousSite() {
    return '<anonymous>';
  }

  NativeSite() {
    return 'native';
  }

  FileSite(site) {
    return `${this.visit(site.locator)}${this.visit(site.position)}`;
  }

  IndexSite(site) {
    return `index ${site.index}`;
  }

  Locator(locator) {
    return this[locator.type](locator);
  }

  AnonymousLocator() {
    return '<anonymous>';
  }

  PathLocator(locator) {
    return locator.path;
  }

  URILocator(locator) {
    return decodeURI(`${locator.scheme}://${locator.path}`);
  }

  Position(pos) {
    return `:${pos.line}:${pos.column}`;
  }
}

const printNode = (node, options) => new V8PrintVisitor({}, options).visit(node);

module.exports = { nodeTypes, Visitor, PrintVisitor: V8PrintVisitor, printNode, isNode };
