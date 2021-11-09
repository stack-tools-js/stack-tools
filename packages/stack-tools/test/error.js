const test = require('ava');

const {
  parseError,
  replaceMessage,
  printErrorHeader,
  printFrames,
  printError,
} = require('stack-tools');
const { makeTestError } = require('../../../test/fixtures/error.js');
const {
  testErrorName,
  testErrorMessage,
  testErrorHeader,
  testErrorFrames,
  testErrorStack,
} = require('../../../test/fixtures/errors.js');

test('can parse an error', (t) => {
  t.deepEqual(parseError(makeTestError()), {
    name: testErrorName,
    message: testErrorMessage,
    frames: testErrorFrames,
  });

  t.deepEqual(parseError(makeTestError({ stack: null })), {
    name: testErrorName,
    message: testErrorMessage,
  });

  t.deepEqual(parseError(makeTestError({ stack: 'Nonsense\n    at foo.js:1:1' })), {
    name: testErrorName,
    message: testErrorMessage,
  });

  t.throws(() => parseError(2));
});

test('can parse an error printed with displayName', (t) => {
  const testError = new Error(testErrorMessage);
  testError.displayName = testErrorName;
  testError.stack = `${testErrorName}: ${testErrorMessage}\n${testErrorFrames.join('\n')}`;

  t.deepEqual(parseError(testError), {
    name: 'Error',
    message: testErrorMessage,
    frames: testErrorFrames,
  });
});

test('can replace an error message', (t) => {
  let message, stack;
  const newMessage = 'Who let the dogs out??';
  const newHeader = `${testErrorName}: ${newMessage}`;

  ({ message, stack } = replaceMessage(makeTestError(), newMessage));

  t.is(message, newMessage);
  t.true(stack.startsWith(newHeader));
  t.is(stack.slice(newHeader.length + 1), testErrorFrames.join('\n'));

  ({ message, stack } = replaceMessage(makeTestError(), (message) => `${message} : )`));

  t.is(message, `${testErrorMessage} : )`);

  ({ message, stack } = replaceMessage(makeTestError({ stack: null }), newMessage));

  t.is(message, newMessage);
  t.is(stack, null);
});

test('can print an error header', (t) => {
  t.is(printErrorHeader(makeTestError()), testErrorHeader);

  t.is(printErrorHeader({ name: '', message: '' }), 'Error');
  t.is(printErrorHeader({ name: '', message: 'foo' }), 'Error: foo');
  t.is(printErrorHeader({ name: 'TypeError', message: '' }), 'TypeError');
});

test('can print an error', (t) => {
  t.is(printError(makeTestError()), testErrorStack);

  t.is(printError(makeTestError({ stack: testErrorHeader })), testErrorHeader);
});

test("can print an error's stack frames", (t) => {
  t.is(printFrames(makeTestError()), testErrorFrames.join('\n'));
  t.is(printFrames(parseError(makeTestError())), testErrorFrames.join('\n'));
});
