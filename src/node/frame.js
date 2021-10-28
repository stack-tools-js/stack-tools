const { builtinModules } = require('module');

const v8 = require('../lib/v8/frame.js');

function* map(iterable, cb) {
  for (const value of iterable) yield cb(value);
}

function* concat(...iterables) {
  for (const iterable of iterables) yield* iterable;
}

const natives = [
  ...map(
    concat(builtinModules, ['bootstrap_node', 'node']),
    (n) => new RegExp(`^(?:node:)?${n}(\\.[cm]?js)?$`),
  ),
  /\/\.node-spawn-wrap-\w+-\w+\/node$/,
];

// (node:)?internal/.+
function isInternalFrame(frame) {
  const { site } = frame;
  return (
    v8.isInternalFrame(frame) ||
    (site.type === 'file' && natives.some((regex) => regex.test(site.file)))
  );
}

module.exports = { ...v8, isInternalFrame };
