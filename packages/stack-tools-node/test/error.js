const test = require('ava');

const { parseError, cleanError } = require('@stack-tools/node-tools');

const { fileFooFrame, testErrorName, testErrorMessage, testError } = require('./fixtures/error.js');

test('cleans an error', (t) => {
  t.deepEqual(cleanError(parseError(testError)), {
    name: testErrorName,
    message: testErrorMessage,
    frames: [fileFooFrame],
  });
});
