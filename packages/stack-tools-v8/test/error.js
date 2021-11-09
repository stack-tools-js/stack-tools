const test = require('ava');

const { parseError, printError, printFrames, cleanError } = require('@stack-tools/v8-tools');
const {
  TestError,
  nativeFrame,
  nativeFrameStr,
  fileFooFrame,
  testErrorName,
  testErrorMessage,
  testErrorHeader,
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

  t.throws(() => parseError(2));
});

test('when causal errors are present in the stack', (t) => {
  const looseErrorName = 'MagicError';
  const looseErrorMessage = 'Abracadabra!';
  const testError = new TestError(testErrorMessage);
  testError.stack =
    testErrorStack + `\nCaused by: ${looseErrorName}: ${looseErrorMessage}\n${nativeFrameStr}`;

  t.throws(() => parseError(testError, { strict: true }));

  t.deepEqual(parseError(testError), {
    name: testErrorName,
    message: testErrorMessage,
    frames: testErrorFrames,
  });
});

test('prints an error', (t) => {
  t.is(printError(testError), testErrorStack);

  const headerError = { name: testErrorName, message: testErrorMessage };
  t.is(printError(headerError), testErrorHeader);
  t.is(printError({ ...headerError, prefix: 'Id est' }), testErrorHeader);
});

test("prints an error's frames", (t) => {
  t.is(printFrames(testError), testErrorFramesStr);
  const parsedError = {
    name: testErrorName,
    message: testErrorMessage,
  };
  t.is(printFrames({ ...parsedError, frames: testErrorFramesStr.split('\n') }), testErrorFramesStr);
  t.is(printFrames({ ...parsedError, frames: testErrorFramesStr }), testErrorFramesStr);
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
