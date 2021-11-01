const { printFrames } = require('./error');

function captureFrames(omitFrames = 1) {
  const frames = printFrames(new Error()).split('\n');

  return frames.slice(omitFrames).join('\n');
}

module.exports = {
  captureFrames,
};
