const test = require('ava');

const { parseError, printErrorHeader, printFrames, printError } = require('stack-tools');
const {
  TestError,
  testErrorName,
  testErrorMessage,
  testErrorHeader,
  testErrorFrames,
  testErrorStack,
  testError,
} = require('../../../test/fixtures/errors.js');

test('can parse an error', (t) => {
  t.deepEqual(parseError(testError), {
    name: testErrorName,
    message: testErrorMessage,
    frames: testErrorFrames,
  });

  const noStackError = new TestError(testErrorMessage);
  noStackError.stack = null;

  t.deepEqual(parseError(noStackError), {
    name: testErrorName,
    message: testErrorMessage,
  });

  const badStackError = new TestError(testErrorMessage);
  badStackError.stack = 'Nonsense\n    at foo.js:1:1';
  t.deepEqual(parseError(badStackError), {
    name: testErrorName,
    message: testErrorMessage,
  });

  t.throws(() => parseError(2));
});

test('can parse an error printed with displayName', (t) => {
  const testError = new Error(testErrorMessage);
  testError.displayName = testErrorName;
  testError.stack = `${testErrorName}: ${testErrorMessage}\n${testErrorFrames.join('\n')}`;

  t.deepEqual(parseError(testError), {
    name: 'Error',
    message: testErrorMessage,
    frames: testErrorFrames,
  });
});

test('can print an error header', (t) => {
  t.is(printErrorHeader(testError), testErrorHeader);

  t.is(printErrorHeader({ name: '', message: '' }), 'Error');
  t.is(printErrorHeader({ name: '', message: 'foo' }), 'Error: foo');
  t.is(printErrorHeader({ name: 'TypeError', message: '' }), 'TypeError');
});

test('can print an error', (t) => {
  t.is(printError(testError), testErrorStack);

  const emptyStackError = new TestError(testErrorMessage);
  emptyStackError.stack = testErrorHeader;

  t.is(printError(emptyStackError), testErrorHeader);
});

test("can print an error's stack frames", (t) => {
  t.is(printFrames(testError), testErrorFrames.join('\n'));
  t.is(printFrames(parseError(testError)), testErrorFrames.join('\n'));
});
