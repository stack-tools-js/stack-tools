const test = require('ava');

const { getErrors, parseErrors, printErrorHeaders, printErrors } = require('../src');
const {
  testCauseName,
  testCauseMessage,
  testCauseHeader,
  testCauseFrames,
  testCauseStack,
  testCause,
  testErrorName,
  testErrorMessage,
  testErrorHeader,
  testErrorFrames,
  testErrorStack,
  testError,
} = require('./fixtures/errors.js');

test('can get errors', (t) => {
  t.deepEqual(getErrors(testError), [testError, testCause]);
});

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

  // We can't parse this because we have no idea what the syntax of stack frames is
  t.throws(() => parseErrors('Error: Message'));
});

test('can print a chain of error headers', (t) => {
  const expected = `${testErrorHeader}\nCaused by: ${testCauseHeader}`;
  t.is(printErrorHeaders(testError), expected);
  t.is(printErrorHeaders(parseErrors(testError)), expected);
});

test('can print a chain of errors', (t) => {
  const expected = `${testErrorStack}\nCaused by: ${testCauseStack}`;
  t.is(printErrors(testError), expected);
  t.is(printErrors(parseErrors(testError)), expected);
});
