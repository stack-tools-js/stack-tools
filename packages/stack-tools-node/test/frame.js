const test = require('ava');
const { isInternalFrame } = require('@stack-tools/node-tools');

const { fsFrame } = require('./fixtures/error.js');

test('isInternalFrame', (t) => {
  t.true(
    isInternalFrame({
      type: 'CallSiteFrame',
      callSite: {
        call: undefined,
        site: { type: 'NativeSite' },
      },
    }),
  );
  t.true(isInternalFrame(fsFrame));
  t.false(
    isInternalFrame({
      type: 'CallSiteFrame',
      callSite: {
        call: undefined,
        site: { type: 'FileSite', locator: { type: 'PathLocator', path: 'foo' } },
      },
    }),
  );
});
