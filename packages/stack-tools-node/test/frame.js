const test = require('ava');
const { isInternalFrame } = require('@stack-tools/node-tools');

const { fsFrame } = require('./fixtures/error.js');

test('isInternalFrame', (t) => {
  t.true(isInternalFrame({ call: null, site: { type: 'native' } }));
  t.true(isInternalFrame(fsFrame));
  t.false(isInternalFrame({ call: null, site: { type: 'path' } }));
});
