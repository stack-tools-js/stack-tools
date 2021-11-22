const test = require('ava');
const { isInternalFrame } = require('@stack-tools/node-tools');

const { cjsLoaderFrame } = require('./fixtures/error.js');

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
  t.true(isInternalFrame({ type: 'NativeSite' }));
  t.true(isInternalFrame(cjsLoaderFrame));
  t.false(
    isInternalFrame({
      type: 'CallSiteFrame',
      callSite: {
        call: undefined,
        site: { type: 'FileSite', locator: { type: 'PathLocator', path: 'foo' } },
      },
    }),
  );
  t.false(isInternalFrame({ type: 'OmittedFrame' }));
  t.throws(() => isInternalFrame({ type: 'Bork' }));
});
