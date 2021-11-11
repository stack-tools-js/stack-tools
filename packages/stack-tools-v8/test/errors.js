const test = require('ava');
const { stripIndent } = require('common-tags');

const { parseErrors, cleanErrors, printErrors } = require('@stack-tools/v8-tools');
const { nativeFrameStr } = require('./fixtures/error');

const {
  nativeFrame,
  fileFooFrame,
  fileBarFrame,
  testCauseHeader,
  testCauseStack,
  testCauseNode,
  testErrorHeader,
  testErrorStack,
  testErrorNode,
  makeTestErrors,
} = require('./fixtures/errors.js');

test('can reprint a string error', (t) => {
  const stack = stripIndent`
    ReferenceError: a is not defined
        at native
    From previous event:
        at native
    Caused by: ZargothError
        at native
    And even before that there was: OriginalError: Where it all began!
        And sometimes there is more text
        at native`;

  const frames = [nativeFrame];

  const parsed = parseErrors(stack);

  t.deepEqual(parsed, [
    {
      type: 'Error',
      name: { type: 'ErrorName', name: 'ReferenceError' },
      message: { type: 'ErrorMessage', message: 'a is not defined' },
      frames,
      prefix: undefined,
    },
    {
      type: 'Error',
      name: undefined,
      message: undefined,
      frames,
      prefix: 'From previous event',
    },
    {
      type: 'Error',
      name: { type: 'ErrorName', name: 'ZargothError' },
      message: undefined,
      frames,
      prefix: undefined,
    },
    {
      type: 'Error',
      name: { type: 'ErrorName', name: 'OriginalError' },
      message: {
        type: 'ErrorMessage',
        message: 'Where it all began!\n    And sometimes there is more text',
      },
      frames,
      prefix: 'And even before that there was',
    },
  ]);

  t.is(printErrors(parsed), stack);

  // If you leave out the colon it's wrong no matter what it says.
  const badStack = stripIndent`
    ReferenceError: a is not defined
        at native
    Caused by
        at native`;

  t.throws(() => parseErrors(badStack));

  t.throws(() => parseErrors(4));
});

test('can print an error chain', (t) => {
  t.is(printErrors(makeTestErrors()), `${testErrorStack}\nCaused by: ${testCauseStack}`);
  t.is(
    printErrors(makeTestErrors(), { strict: true }),
    `${testErrorStack}\nCaused by: ${testCauseStack}`,
  );
  t.is(
    printErrors(makeTestErrors(), { frames: false }),
    `${testErrorHeader}\nCaused by: ${testCauseHeader}`,
  );

  t.throws(() => printErrors(22));
});

test('can parse a chain of errors', (t) => {
  t.deepEqual(parseErrors(makeTestErrors()), [testErrorNode, testCauseNode]);
});

test('when causal headers are present in stack', (t) => {
  const looseErrorName = 'MagicError';
  const looseErrorMessage = 'Abracadabra!';
  const testError = makeTestErrors({
    stack:
      testErrorStack + `\nCaused by: ${looseErrorName}: ${looseErrorMessage}\n${nativeFrameStr}`,
  });

  t.throws(() => parseErrors(testError, { strict: true }));

  t.deepEqual(parseErrors(testError), [
    testErrorNode,
    {
      type: 'Error',
      name: { type: 'ErrorName', name: looseErrorName },
      message: { type: 'ErrorMessage', message: looseErrorMessage },
      frames: [nativeFrame],
      prefix: undefined,
    },
    testCauseNode,
  ]);
});

test('cleans a chain of errors', (t) => {
  t.deepEqual(cleanErrors(parseErrors(makeTestErrors())), [
    {
      ...testErrorNode,
      frames: [fileFooFrame],
    },
    {
      ...testCauseNode,
      frames: [fileBarFrame],
    },
  ]);
});

test('can print a chain of errors', (t) => {
  t.is(
    printErrors([testErrorNode, testCauseNode]),
    `${testErrorStack}\nCaused by: ${testCauseStack}`,
  );

  t.is(printErrors([{ ...testErrorNode, frames: undefined }]), testErrorHeader);
  t.is(printErrors([{ ...testErrorNode, frames: undefined, prefix: 'Id est' }]), testErrorHeader);
});
