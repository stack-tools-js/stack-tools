const test = require('ava');

const { parseErrors, cleanErrors } = require('@stack-tools/node-tools');

const {
  fileFooFrame,
  fileBarFrame,
  testCauseName,
  testCauseMessage,
  testErrorName,
  testErrorMessage,
  testError,
} = require('./fixtures/errors.js');

test('cleans a causal chain of errors', (t) => {
  t.deepEqual(cleanErrors(parseErrors(testError)), [
    {
      name: testErrorName,
      message: testErrorMessage,
      frames: [fileFooFrame],
    },
    {
      name: testCauseName,
      message: testCauseMessage,
      frames: [fileBarFrame],
    },
  ]);
});
