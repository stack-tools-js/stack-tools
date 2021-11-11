const test = require('ava');

const { parseErrors, cleanErrors } = require('@stack-tools/node-tools');

const {
  fileFooFrame,
  fileBarFrame,
  testErrorNode,
  testCauseNode,
  makeTestErrors,
} = require('./fixtures/errors.js');

test('cleans a causal chain of errors', (t) => {
  t.deepEqual(cleanErrors(parseErrors(makeTestErrors())), [
    {
      ...testErrorNode,
      frames: [fileFooFrame],
    },
    {
      ...testCauseNode,
      frames: [fileBarFrame],
    },
  ]);
});
