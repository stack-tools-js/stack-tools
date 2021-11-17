const test = require('ava');

const { getErrors, parseErrors, printErrors } = require('stack-tools');
const {
  testCauseHeader,
  testCauseStack,
  testCauseNode,
  makeTestCause,
  testErrorHeader,
  testErrorStack,
  testErrorNode,
  makeTestErrors,
} = require('../../../test/fixtures/errors.js');

test('can get errors', (t) => {
  t.deepEqual(getErrors(makeTestErrors()), [makeTestErrors(), makeTestCause()]);
});

test('can parse a chain of error', (t) => {
  t.deepEqual(parseErrors(makeTestErrors()), {
    type: 'ErrorChain',
    errors: [testErrorNode, testCauseNode],
  });

  // We can't parse this because we have no idea what the syntax of stack frames is
  t.throws(() => parseErrors('Error: Message'));
});

test('can print a chain of errors without frames', (t) => {
  const expected = `${testErrorHeader}\nCaused by: ${testCauseHeader}`;
  t.is(printErrors(makeTestErrors(), { frames: false }), expected);
  t.is(printErrors(parseErrors(makeTestErrors()), { frames: false }), expected);
});

test('can print a chain of errors', (t) => {
  const expected = `${testErrorStack}\nCaused by: ${testCauseStack}`;
  t.is(printErrors(makeTestErrors()), expected);
  t.is(printErrors(parseErrors(makeTestErrors())), expected);
});
