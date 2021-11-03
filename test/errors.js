const test = require('ava');

const { parseErrors, printErrorHeaders, printErrors } = require('../src');
const {
  testCauseName,
  testCauseMessage,
  testCauseHeader,
  testCauseFrames,
  testCauseStack,
  testErrorName,
  testErrorMessage,
  testErrorHeader,
  testErrorFrames,
  testErrorStack,
  testError,
} = require('./fixtures/errors.js');

test('can parse a chain of error', (t) => {
  t.deepEqual(parseErrors(testError), [
    {
      name: testErrorName,
      message: testErrorMessage,
      frames: testErrorFrames,
    },
    {
      name: testCauseName,
      message: testCauseMessage,
      frames: testCauseFrames,
    },
  ]);
});

test('can print a chain of error headers', (t) => {
  const expected = `${testErrorHeader}\nCaused by: ${testCauseHeader}`;
  t.is(printErrorHeaders(testError), expected);
});

test('can print a chain of errors', (t) => {
  const expected = `${testErrorStack}\nCaused by: ${testCauseStack}`;
  t.is(printErrors(testError), expected);
});
