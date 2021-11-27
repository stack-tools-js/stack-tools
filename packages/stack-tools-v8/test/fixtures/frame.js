const buildSiteFrame = (locator) => {
  return {
    type: 'CallSiteFrame',
    callSite: {
      call: undefined,
      site: {
        type: 'FileSite',
        locator,
        position: {
          type: 'Position',
          line: 1,
          column: 1,
        },
      },
    },
  };
};

module.exports = { buildSiteFrame };
