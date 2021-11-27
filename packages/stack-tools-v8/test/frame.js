const test = require('ava');
const { parseFrame, isInternalFrame, getAbsoluteSitePath } = require('@stack-tools/v8-tools');
const { nativeFrame, fileFooPath, fileFooFrame } = require('./fixtures/error');
const { buildSiteFrame } = require('./fixtures/frame');

test('parseFrame', (t) => {
  t.is(parseFrame(nativeFrame), nativeFrame);
  t.throws(() => parseFrame(1));
});

test('isInternalFrame', (t) => {
  t.true(isInternalFrame(nativeFrame));
  t.false(isInternalFrame(fileFooFrame));
  t.false(isInternalFrame({ type: 'OmittedFrame' }));
  t.throws(() => isInternalFrame(1000000));
});

test('getAbsoluteSitePath', (t) => {
  t.is(getAbsoluteSitePath(nativeFrame), null);
  t.is(
    getAbsoluteSitePath(buildSiteFrame({ type: 'PathLocator', path: '/home/foo.js' })),
    '/home/foo.js',
  );
  t.is(
    getAbsoluteSitePath(
      buildSiteFrame({ type: 'URILocator', scheme: 'file', path: '/home/bar.js' }),
    ),
    '/home/bar.js',
  );
  t.is(
    getAbsoluteSitePath(
      buildSiteFrame({ type: 'URILocator', scheme: 'https', path: '/home/foo.js' }),
    ),
    null,
  );
  t.is(getAbsoluteSitePath(buildSiteFrame({ type: 'PathLocator', path: 'home/foo.js' })), null);
  t.is(getAbsoluteSitePath(fileFooFrame.callSite.site), fileFooPath);
  t.is(getAbsoluteSitePath({ type: 'OmittedFrame' }), null);

  t.throws(() => getAbsoluteSitePath(666));
});
