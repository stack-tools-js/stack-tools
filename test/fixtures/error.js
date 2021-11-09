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

const makeTestError = ({ message = testErrorMessage, stack = testErrorStack } = {}) => {
  const testError = new TestError(message);
  testError.stack = stack;
  return testError;
};

module.exports = {
  TestError,
  testErrorName,
  testErrorMessage,
  testErrorHeader,
  testErrorFrames,
  testErrorStack,
  makeTestError,
};
