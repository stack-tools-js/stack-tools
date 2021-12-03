const test = require('ava');

const { parseError, printError, cleanError } = require('@stack-tools/v8-tools');
const {
  nativeFrame,
  nativeFrameStr,
  fileFooFrame,
  testErrorName,
  testErrorHeader,
  testErrorFrameStrs,
  testErrorStack,
  testErrorNode,
  makeTestError,
} = require('./fixtures/error.js');

test('works when there are no stack frames', (t) => {
  const stack = 'ReferenceError: a is not defined';

  const parsed = parseError(stack);

  t.deepEqual(parsed, {
    type: 'Error',
    name: { type: 'ErrorName', name: 'ReferenceError' },
    message: { type: 'ErrorMessage', message: 'a is not defined' },
    frames: undefined,
    prefix: undefined,
  });

  t.is(printError(parsed), stack);
});

test('eliminates extra whitespace at the beginning end of message and frames', (t) => {
  const stack = 'ReferenceError:   a is not defined\n\nat native  ';

  const parsed = parseError(stack);

  t.deepEqual(parsed, {
    type: 'Error',
    name: { type: 'ErrorName', name: 'ReferenceError' },
    message: { type: 'ErrorMessage', message: '  a is not defined' },
    frames: [nativeFrame],
    prefix: undefined,
  });
});

test('parses an error', (t) => {
  t.deepEqual(parseError(makeTestError()), testErrorNode);
  t.deepEqual(parseError(makeTestError(), { frames: false }), {
    ...testErrorNode,
    frames: undefined,
  });
  t.deepEqual(parseError(makeTestError(), { frames: false, strict: true }), {
    ...testErrorNode,
    frames: undefined,
  });
  t.deepEqual(parseError(testErrorStack, { parseFrames: false, strict: true }), {
    ...testErrorNode,
    frames: testErrorFrameStrs.map((text) => ({ type: 'TextFrame', text })),
  });
  t.is(parseError(testErrorNode), testErrorNode);

  t.throws(() => parseError(2));
});

test('when causal errors are present in the stack', (t) => {
  const looseErrorName = 'MagicError';
  const looseErrorMessage = 'Abracadabra!';
  const testError = makeTestError({
    stack:
      testErrorStack + `\nCaused by: ${looseErrorName}: ${looseErrorMessage}\n${nativeFrameStr}`,
  });

  t.throws(() => parseError(testError, { strict: true }));

  t.deepEqual(parseError(testError), testErrorNode);
});

test('prints an error', (t) => {
  t.is(printError(makeTestError()), testErrorStack);
  t.is(printError(makeTestError(), { strict: true }), testErrorStack);

  t.is(printError({ ...testErrorNode, frames: undefined }), testErrorHeader);
  t.is(printError({ ...testErrorNode }, { frames: false }), testErrorHeader);
  t.is(printError({ ...testErrorNode, frames: undefined, prefix: 'Id est' }), testErrorHeader);

  t.throws(() =>
    printError({ ...testErrorNode, name: { type: 'FubarName', name: testErrorName } }),
  );
  t.throws(() => printError(99.98));
});

test('cleans an error', (t) => {
  t.deepEqual(cleanError(parseError(makeTestError())), {
    ...testErrorNode,
    frames: [fileFooFrame],
  });

  t.is(
    cleanError('ReferenceError:  a is not defined\n\nat native '),
    'ReferenceError:  a is not defined\n    at <omitted>',
  );
});

test('throws when given an unparseable error', (t) => {
  t.throws(() => parseError([]));
});
