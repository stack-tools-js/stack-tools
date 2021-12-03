const {
  isInternalFrame: isInternalFrameV8,
  getAbsoluteSitePath: getAbsoluteSitePathV8,
} = require('@stack-tools/v8-tools');

const { builtinModules } = require('module');

const processCwd = process.cwd();

const natives = [
  ...['bootstrap_node', 'node', 'internal/.*?', ...builtinModules].map(
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
    return node.type === 'CallSiteFrame' ? __isInternalSite(node.callSite.site) : false;
  } else if (node.type.endsWith('Site')) {
    return __isInternalSite(node);
  } else {
    throw new TypeError('node argument to isInternalFrame must be a FrameNode or SiteNode');
  }
}

function getAbsoluteSitePath(node, options = {}) {
  const { cwd = processCwd } = options;
  return getAbsoluteSitePathV8(node, { ...options, cwd });
}

module.exports = { isInternalFrame, getAbsoluteSitePath };
