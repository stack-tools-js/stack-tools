const test = require('ava');

const { getErrors, parseErrors, printErrorHeaders, printErrors } = require('stack-tools');
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
  makeTestErrors,
} = require('../../../test/fixtures/errors.js');

test('can get errors', (t) => {
  t.deepEqual(getErrors(makeTestErrors()), [makeTestErrors(), testCause]);
});

test('can parse a chain of error', (t) => {
  t.deepEqual(parseErrors(makeTestErrors()), [
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
  t.is(printErrorHeaders(makeTestErrors()), expected);
  t.is(printErrorHeaders(parseErrors(makeTestErrors())), expected);
});

test('can print a chain of errors', (t) => {
  const expected = `${testErrorStack}\nCaused by: ${testCauseStack}`;
  t.is(printErrors(makeTestErrors()), expected);
  t.is(printErrors(parseErrors(makeTestErrors())), expected);
});
