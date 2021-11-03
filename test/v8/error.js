const test = require('ava');

const { parseError, printError, printFrames, cleanError } = require('../../src/v8');

class TestError extends Error {
  get name() {
    return 'TestError';
  }
}

const nativeFrame = { call: null, site: { type: 'native' } };
const fileFrame = { call: null, site: { type: 'path', path: 'foo.js', line: 1, column: 1 } };

const testErrorName = 'TestError';
const testErrorMessage = '¯\\_(ツ)_/¯';
const testErrorHeader = `${testErrorName}: ${testErrorMessage}`;
const testErrorFrames = ['  at native', '  at foo.js:1:1'];
const testErrorStack = `${testErrorHeader}\n${testErrorFrames.join('\n')}`;

const testError = new TestError(testErrorMessage);
testError.stack = testErrorStack;

test('works when there are no stack frames', (t) => {
  const stack = 'ReferenceError: a is not defined';

  const parsed = parseError(stack);

  t.deepEqual(parsed, {
    name: 'ReferenceError',
    message: 'a is not defined',
    frames: [],
  });

  t.is(printError(parsed), stack);
});

test('eliminates extra whitespace at the beginning end of message and frames', (t) => {
  const stack = 'ReferenceError:   a is not defined\n\nat native  ';

  const parsed = parseError(stack);

  t.deepEqual(parsed, {
    name: 'ReferenceError',
    message: 'a is not defined',
    frames: [nativeFrame],
  });
});

test('parses an error', (t) => {
  t.deepEqual(parseError(testError), {
    name: testErrorName,
    message: testErrorMessage,
    frames: [nativeFrame, fileFrame],
  });
});

test('prints an error', (t) => {
  t.is(printError(testError), testErrorStack);
});

test("prints an error's frames", (t) => {
  t.is(printFrames(testError), testErrorFrames.join('\n'));
});

test('cleans an error', (t) => {
  t.deepEqual(cleanError(parseError(testError)), {
    name: testErrorName,
    message: testErrorMessage,
    frames: [fileFrame],
  });

  t.is(
    cleanError('ReferenceError:  a is not defined\n\nat native '),
    'ReferenceError: a is not defined\n  at <omitted>',
  );
});

test('throws when given an unparseable error', (t) => {
  t.throws(() => parseError([]));
});
