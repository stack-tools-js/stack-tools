const test = require('ava');
const { isInternalFrame, getAbsoluteSitePath } = require('@stack-tools/node-tools');

const { cjsLoaderFrame, nativeFrame } = require('./fixtures/error');
const { buildSiteFrame } = require('../../stack-tools-v8/test/fixtures/frame');

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

test('getAbsoluteSitePath', (t) => {
  t.is(getAbsoluteSitePath(nativeFrame), null);
  t.is(
    getAbsoluteSitePath(buildSiteFrame({ type: 'PathLocator', path: './home/foo.js' }), {
      cwd: '/',
    }),
    '/home/foo.js',
  );
});
