const { builtinModules } = require('module');

const { isInternalFrame: isInternalFrameV8 } = require('@stack-tools/v8-tools');

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

function isInternalFrame(frame) {
  const { site } = frame.callSite;
  return (
    isInternalFrameV8(frame) ||
    (site.type === 'FileSite' &&
      site.locator.type !== 'AnonymousLocator' &&
      natives.some((regex) => regex.test(site.locator.path)))
  );
}

module.exports = { isInternalFrame };
