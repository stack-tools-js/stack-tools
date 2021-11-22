const nodeTypes = {
  ErrorChain: true,
  Error: true,
  ErrorName: true,
  ErrorMessage: true,
  TextFrame: true,
};

const isNode = (node, type) =>
  node != null &&
  typeof node === 'object' &&
  (type != null ? node.type === type : nodeTypes[node.type]);

const assertNode = (node) => {
  if (!node.type) {
    throw new TypeError('node argument to visit must have a type');
  }
};

class Visitor {
  static visit(node, options) {
    return new this({}, options).visit(node);
  }

  static get suffixMatcher() {
    return /(?:Frame)$/;
  }

  visit(node) {
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
    super(context, { frames: true, ...options });
  }

  visit(node) {
    assertNode(node);

    if (!this[node.type]) {
      throw new TypeError(`node of type ${node.type} is not printable`);
    }

    return super.visit(node);
  }

  ErrorChain(chain) {
    return chain.errors.map((error) => this.visit(error)).join('\nCaused by: ');
  }

  Error(error) {
    const { frames } = this.options;
    const header = this.ErrorHeader(error);

    return frames && error.frames && error.frames.length
      ? `${header}\n${this.Frames(error.frames)}`
      : header;
  }

  ErrorHeader(error) {
    const name = error.name && this.visit(error.name);
    const message = error.message && this.visit(error.message);
    // prettier-ignore
    return name && message
      ? `${name}: ${message}`
      : message
        ? `Error: ${message}`
        : name || 'Error';
  }

  ErrorName(name) {
    return name.name;
  }

  ErrorMessage(message) {
    return message.message;
  }

  Frames(frames) {
    return frames.map((frame) => this.visit(frame)).join('\n');
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
