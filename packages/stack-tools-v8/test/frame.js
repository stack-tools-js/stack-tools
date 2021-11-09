const test = require('ava');
const { parseFrame, isInternalFrame } = require('@stack-tools/v8-tools');
const { nativeFrame, fileFooFrame } = require('./fixtures/error');

test('parseFrame', (t) => {
  t.throws(() => parseFrame('2'));
});

test('isInternalFrame', (t) => {
  t.true(isInternalFrame(nativeFrame));
  t.false(isInternalFrame(fileFooFrame));
});
