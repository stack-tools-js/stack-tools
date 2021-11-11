const nodeTypes = {
  ErrorChain: true,
  Error: true,
  ErrorName: true,
  ErrorMessage: true,
  TextFrame: true,
};

const isNode = (node) => node != null && typeof node === 'object' && nodeTypes[node.type];

const defaultVisitors = {
  ErrorChain(chain, visit) {
    return chain.map((error) => visit(error)).join('\nCaused by: ');
  },
  Error(error, visit) {
    const { frames } = error;
    const header = this.ErrorHeader(error, visit);

    return frames && frames.length ? `${header}\n${this.Frames(frames, visit)}` : header;
  },
  ErrorHeader(error, visit) {
    const name = error.name && visit(error.name);
    const message = error.message && visit(error.message);
    // prettier-ignore
    return name && message
      ? `${name}: ${message}`
      : message
        ? `Error: ${message}`
        : name || 'Error';
  },
  ErrorName(name) {
    return name.name;
  },
  ErrorMessage(message) {
    return message.message;
  },
  Frames(frames, visit) {
    return frames.map((frame) => visit(frame)).join('\n');
  },
  Frame(frame, visit) {
    return visit[frame.type](frame, visit);
  },
  TextFrame(frame) {
    return frame.text;
  },
};

function makeVisit(visitors = {}) {
  const visit = (node) => {
    if (node.type.endsWith('Frame')) {
      return visit.Frame(node, visit);
    } else {
      return visit[node.type](node, visit);
    }
  };

  Object.assign(visit, defaultVisitors, visitors);

  return visit;
}

const visit = makeVisit();

module.exports = { nodeTypes, defaultVisitors, isNode, makeVisit, visit };
