const test = require('ava');
const { parseFrame, isInternalFrame } = require('../../src/v8');

test('parseFrame', (t) => {
  t.throws(() => parseFrame('2'));
});

test('isInternalFrame', (t) => {
  t.true(isInternalFrame({ call: null, site: { type: 'native' } }));
  t.false(isInternalFrame({ call: null, site: { type: 'file' } }));
});
