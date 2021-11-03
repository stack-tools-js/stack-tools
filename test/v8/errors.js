const test = require('ava');
const { stripIndent } = require('common-tags');

const { parseErrors, printErrors } = require('../../src/v8');

const {
  nativeFrame,
  testCauseName,
  testCauseMessage,
  testCauseFrames,
  testCauseStack,
  testErrorName,
  testErrorMessage,
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
      prefix: 'Caused by',
    },
    {
      name: 'OriginalError',
      message: 'Where it all began!',
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

test('can print a causal chain of errors', (t) => {
  t.is(printErrors(testError), `${testErrorStack}\nCaused by: ${testCauseStack}`);
});
