const nodeTypes = {
  ErrorChain: true,
  Error: true,
  ErrorName: true,
  ErrorMessage: true,
  ErrorPrefix: true,
  TextFrame: true,
};

const isNode = (node, type) =>
  node != null &&
  typeof node === 'object' &&
  (type != null ? node.type === type : nodeTypes[node.type]);

const assertNode = (node, type) => {
  if (!node.type) {
    throw new TypeError('node argument to visit must have a type');
  } else if (type && node.type !== type) {
    throw new TypeError(`expected node to have type ${type}`);
  }
};

class Visitor {
  static visit(node, options) {
    return new this({}, options).visit(node);
  }

  static get suffixMatcher() {
    return /$^/;
  }

  visit(node) {
    if (node == null) return node;

    assertNode(node);

    const { suffixMatcher } = this.constructor;
    const typeMatch = suffixMatcher.exec(node.type);
    const type = typeMatch ? typeMatch[0] : node.type;

    return this[type] ? this[type](node) : node;
  }

  constructor(context, options = {}) {
    this.context = context;
    this.options = options;
  }
}

class PrintVisitor extends Visitor {
  constructor(context, options = {}) {
    super(context, { frames: true, brk: '\n', ...options });
  }

  static get suffixMatcher() {
    return /(?:Frame)$/;
  }

  visit(node) {
    if (node && !this[node.type]) {
      throw new TypeError(`node of type ${node.type} is not printable`);
    }

    return super.visit(node);
  }

  ErrorChain(chain) {
    return chain.errors
      .map((error, i) => {
        assertNode(error, 'Error');
        const prefix = i === 0 ? undefined : this.visit(error.prefix) || 'Caused by';
        const hasHeader =
          (error.name && error.name.name) || (error.message && error.message.message);
        const body = this.ErrorBody(error);

        return prefix ? `${prefix}:${hasHeader ? ' ' : '\n'}${body}` : body;
      })
      .join('\n');
  }

  Error(error) {
    return this.ErrorBody(error) || 'Error';
  }

  ErrorBody(error) {
    const header = this.ErrorHeader(error);
    const frames = this.Frames(error.frames);

    return header && frames ? `${header}\n${frames}` : header || frames;
  }

  ErrorHeader(error) {
    const name = this.visit(error.name);
    const message = this.visit(error.message);
    return name && message ? `${name}: ${message}` : name ? `${name}:` : message;
  }

  ErrorName(name) {
    return name.name || undefined;
  }

  ErrorMessage(message) {
    return message.message || undefined;
  }

  ErrorPrefix(prefix) {
    return prefix.prefix || undefined;
  }

  Frames(frames) {
    const { options } = this;
    return frames && options.frames ? frames.map((frame) => this.visit(frame)).join('\n') : '';
  }

  Frame(frame) {
    return this[frame.type](frame);
  }

  TextFrame(frame) {
    return frame.text;
  }
}

const printNode = (node, options) => new PrintVisitor({}, options).visit(node);

module.exports = { nodeTypes, Visitor, PrintVisitor, printNode, isNode };
