const test = require('ava');
const { stripIndent } = require('common-tags');

const { parseErrors, cleanErrors, printErrors } = require('../../src/v8');
const { nativeFrameStr } = require('./fixtures/error');

const {
  TestError,
  nativeFrame,
  fileFooFrame,
  fileBarFrame,
  testCauseName,
  testCauseMessage,
  testCauseFrames,
  testCauseStack,
  testCause,
  testErrorName,
  testErrorMessage,
  testErrorHeader,
  testErrorStack,
  testError,
  testErrorFrames,
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
      name: 'ReferenceError',
      message: 'a is not defined',
      frames,
    },
    {
      name: '',
      message: '',
      frames,
      prefix: 'From previous event',
    },
    {
      name: 'ZargothError',
      message: '',
      frames,
    },
    {
      name: 'OriginalError',
      message: 'Where it all began!\n    And sometimes there is more text',
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
});

test('can parse a causal chain of errors', (t) => {
  t.deepEqual(parseErrors(testError), [
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
});

test('when causal headers are present in stack', (t) => {
  const looseErrorName = 'MagicError';
  const looseErrorMessage = 'Abracadabra!';
  const testError = new TestError(testErrorMessage);
  testError.stack =
    testErrorStack + `\nCaused by: ${looseErrorName}: ${looseErrorMessage}\n${nativeFrameStr}`;
  testError.cause = testCause;

  t.throws(() => parseErrors(testError, { strict: true }));

  t.deepEqual(parseErrors(testError), [
    {
      name: testErrorName,
      message: testErrorMessage,
      frames: testErrorFrames,
    },
    {
      name: looseErrorName,
      message: looseErrorMessage,
      frames: [nativeFrame],
    },
    {
      name: testCauseName,
      message: testCauseMessage,
      frames: testCauseFrames,
    },
  ]);
});

test('cleans a causal chain of errors', (t) => {
  t.deepEqual(cleanErrors(parseErrors(testError)), [
    {
      name: testErrorName,
      message: testErrorMessage,
      frames: [fileFooFrame],
    },
    {
      name: testCauseName,
      message: testCauseMessage,
      frames: [fileBarFrame],
    },
  ]);
});

test('can print an error', (t) => {
  const headerError = { name: testErrorName, message: testErrorMessage };
  t.is(printErrors([headerError]), testErrorHeader);
  t.is(printErrors([{ ...headerError, prefix: 'Id est' }]), testErrorHeader);
});

test('can print a causal chain of errors', (t) => {
  t.is(printErrors(testError), `${testErrorStack}\nCaused by: ${testCauseStack}`);
});
