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

class Visitor {
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
    if (node.type.endsWith('Frame')) {
      return this.Frame(node);
    } else {
      return this[node.type](node);
    }
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
