const { isInternalFrame: isInternalFrameV8 } = require('@stack-tools/v8-tools');

const natives = [
  ...['bootstrap_node', 'node', 'internal/.*?'].map(
    (n) => new RegExp(`^(?:node:)?${n}(\\.[cm]?js)?$`),
  ),
  /\/\.node-spawn-wrap-\w+-\w+\/node$/,
];

function __isInternalSite(site) {
  return (
    isInternalFrameV8(site) ||
    (site.type === 'FileSite' &&
      site.locator.type !== 'AnonymousLocator' &&
      natives.some((regex) => regex.test(site.locator.path)))
  );
}

function isInternalFrame(node) {
  if (node.type.endsWith('Frame')) {
    return node.type === 'CallSiteFrame' || node.type === 'EvalFrame'
      ? __isInternalSite(node.callSite.site)
      : false;
  } else if (node.type.endsWith('Site')) {
    return __isInternalSite(node);
  } else {
    throw new TypeError('node argument to isInternalFrame must be a FrameNode or SiteNode');
  }
}

module.exports = { isInternalFrame };
