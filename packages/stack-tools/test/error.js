const test = require('ava');

const { parseError, replaceMessage, printError } = require('stack-tools');
const {
  testErrorName,
  testErrorMessage,
  testErrorHeader,
  testErrorFrames,
  testErrorFrameStrs,
  testErrorStack,
  testErrorNode,
  makeTestError,
} = require('../../../test/fixtures/error.js');

test('can parse an error', (t) => {
  t.deepEqual(parseError(makeTestError()), testErrorNode);

  t.deepEqual(parseError(makeTestError({ stack: null })), {
    ...testErrorNode,
    frames: undefined,
  });

  t.deepEqual(parseError(makeTestError({ stack: 'Nonsense\n    at foo.js:1:1' })), {
    ...testErrorNode,
    frames: undefined,
  });

  const testErrorNodeNoFrames = {
    ...testErrorNode,
    frames: undefined,
  };

  t.is(parseError(testErrorNode), testErrorNode);
  t.is(parseError(testErrorNodeNoFrames, { frames: false }), testErrorNodeNoFrames);

  t.deepEqual(parseError(testErrorNode, { frames: false }), testErrorNodeNoFrames);

  t.throws(() => parseError(2));
});

test('can parse an error printed with displayName', (t) => {
  const testError = new Error(testErrorMessage);
  testError.displayName = testErrorName;
  testError.stack = `${testErrorName}: ${testErrorMessage}\n${testErrorFrameStrs.join('\n')}`;

  t.deepEqual(parseError(testError), testErrorNode);
});

test('can replace an error message', (t) => {
  let message, stack;
  const newMessage = 'Who let the dogs out??';
  const newHeader = `${testErrorName}: ${newMessage}`;

  ({ message, stack } = replaceMessage(makeTestError(), newMessage));

  t.is(message, newMessage);
  t.true(stack.startsWith(newHeader));
  t.is(stack.slice(newHeader.length + 1), testErrorFrameStrs.join('\n'));

  ({ message, stack } = replaceMessage(makeTestError(), (message) => `${message} : )`));

  t.is(message, `${testErrorMessage} : )`);

  ({ message, stack } = replaceMessage(makeTestError({ stack: null }), newMessage));

  t.is(message, newMessage);
  t.is(stack, null);

  t.throws(() => replaceMessage());
});

test('can print an empty error', (t) => {
  t.is(
    printError(
      {
        type: 'Error',
        prefix: undefined,
        name: undefined,
        message: undefined,
        frames: undefined,
      },
      { frames: false },
    ),
    'Error',
  );
});

test('can print an error without frames', (t) => {
  t.is(printError(makeTestError(), { frames: false }), testErrorHeader);

  t.is(
    printError(
      {
        type: 'Error',
        prefix: undefined,
        name: { type: 'ErrorName', name: 'Error' },
        message: { type: 'ErrorMessage', message: '' },
        frames: testErrorFrames,
      },
      { frames: false },
    ),
    'Error:',
  );
  t.is(
    printError(
      {
        type: 'Error',
        prefix: undefined,
        name: { type: 'ErrorName', name: '' },
        message: { type: 'ErrorMessage', message: 'foo' },
        frames: undefined,
      },
      { frames: false },
    ),
    'foo',
  );
  t.is(
    printError(
      {
        type: 'Error',
        prefix: undefined,
        name: { type: 'ErrorName', name: 'TypeError' },
        message: { type: 'ErrorMessage', message: '' },
      },
      { frames: false },
    ),
    'TypeError:',
  );
});

test('can print an error', (t) => {
  t.is(printError(makeTestError()), testErrorStack);

  t.is(printError(makeTestError({ stack: testErrorHeader })), testErrorHeader);

  t.throws(() => printError(1200));
});
