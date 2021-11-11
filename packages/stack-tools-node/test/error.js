const test = require('ava');

const { parseError, cleanError } = require('@stack-tools/node-tools');

const { fileFooFrame, testErrorNode, makeTestError } = require('./fixtures/error.js');

test('cleans an error', (t) => {
  t.deepEqual(cleanError(parseError(makeTestError())), {
    ...testErrorNode,
    frames: [fileFooFrame],
  });
});
