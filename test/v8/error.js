const test = require('ava');

const { parseError, printError, printFrames, cleanError } = require('../../src/v8');
const {
  nativeFrame,
  fileFooFrame,
  testErrorName,
  testErrorMessage,
  testErrorStack,
  testError,
  testErrorFrames,
  testErrorFramesStr,
} = require('./fixtures/error.js');

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
    frames: testErrorFrames,
  });
});

test('prints an error', (t) => {
  t.is(printError(testError), testErrorStack);
});

test("prints an error's frames", (t) => {
  t.is(printFrames(testError), testErrorFramesStr);
});

test('cleans an error', (t) => {
  t.deepEqual(cleanError(parseError(testError)), {
    name: testErrorName,
    message: testErrorMessage,
    frames: [fileFooFrame],
  });

  t.is(
    cleanError('ReferenceError:  a is not defined\n\nat native '),
    'ReferenceError: a is not defined\n    at <omitted>',
  );
});

test('throws when given an unparseable error', (t) => {
  t.throws(() => parseError([]));
});
