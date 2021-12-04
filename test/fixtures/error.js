class TestError extends Error {
  get name() {
    return 'TestError';
  }
}

const anonymousTextFrame = { type: 'TextFrame', text: '    at <anonymous> (test/index.js:1:1)' };
const callTextFrame = { type: 'TextFrame', text: '    at buildTestError (test/index.js:2:1)' };

const testErrorName = 'TestError';
const testErrorMessage = '¯\\_(ツ)_/¯';
const testErrorHeader = `${testErrorName}: ${testErrorMessage}`;
const testErrorFrames = [anonymousTextFrame, callTextFrame];
const testErrorFrameStrs = testErrorFrames.map((frame) => frame.text);
const testErrorStack = `${testErrorHeader}\n${testErrorFrameStrs.join('\n')}`;
const testErrorNode = {
  type: 'Error',
  prefix: undefined,
  name: { type: 'ErrorName', name: testErrorName },
  message: { type: 'ErrorMessage', message: testErrorMessage },
  frames: testErrorFrames,
};

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
  testErrorFrameStrs,
  testErrorStack,
  testErrorNode,
  makeTestError,
};
