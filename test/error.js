const test = require('ava');

const { parseError, printErrorHeader, printFrames, printError } = require('../lib');

class TestError extends Error {
  get name() {
    return 'TestError';
  }
}

const testErrorName = 'TestError';
const testErrorMessage = '¯\\_(ツ)_/¯';
const testErrorHeader = `${testErrorName}: ${testErrorMessage}`;
const testErrorFrames = [
  '    at <anonymous> (test/index.js:1:1)',
  '    at buildTestError (test/index.js:2:1)',
];
const testErrorStack = `${testErrorHeader}\n${testErrorFrames.join('\n')}`;

const testError = new TestError(testErrorMessage);

testError.stack = testErrorStack;

test('can parse an error', (t) => {
  t.deepEqual(parseError(testError), {
    header: testErrorHeader,
    frames: testErrorFrames,
  });
});

test('can print an error header', (t) => {
  t.is(printErrorHeader(testError), testErrorHeader);
});

test('can print an error', (t) => {
  t.is(printError(testError), testErrorStack);
});

test("can print an error's stack frames", (t) => {
  t.is(printFrames(testError), testErrorFrames.join('\n'));
});
