const test = require('ava');

const { parseError, printErrorHeader, printFrames, printError } = require('../src');
const {
  testErrorName,
  testErrorMessage,
  testErrorHeader,
  testErrorFrames,
  testErrorStack,
  testError,
} = require('./fixtures/errors.js');

test('can parse an error', (t) => {
  t.deepEqual(parseError(testError), {
    name: testErrorName,
    message: testErrorMessage,
    frames: testErrorFrames,
  });

  t.throws(() => parseError(2));
});

test('can print an error header', (t) => {
  t.is(printErrorHeader(testError), testErrorHeader);

  t.is(printErrorHeader({ name: '', message: '' }), 'Error');
  t.is(printErrorHeader({ name: '', message: 'foo' }), 'Error: foo');
  t.is(printErrorHeader({ name: 'TypeError', message: '' }), 'TypeError');
});

test('can print an error', (t) => {
  t.is(printError(testError), testErrorStack);
});

test("can print an error's stack frames", (t) => {
  t.is(printFrames(testError), testErrorFrames.join('\n'));
});
