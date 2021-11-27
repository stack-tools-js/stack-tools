const { parseFrame } = require('../frame.js');

function parseFrames(textFrames, options) {
  const { frames = true, parseFrames = true } = options;
  return frames && textFrames
    ? parseFrames
      ? textFrames.map((frame) => parseFrame(frame.text))
      : textFrames
    : undefined;
}

module.exports = { parseFrames };
