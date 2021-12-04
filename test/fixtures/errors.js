const error = require('./error.js');

const { TestError, testErrorMessage, testErrorStack, testErrorNode } = error;

const nativeTextFrame = { type: 'TextFrame', text: `    at native` };

const testCauseName = 'Error';
const testCauseMessage = 'the system is down';
const testCauseHeader = `${testCauseName}: ${testCauseMessage}`;
const testCauseFrames = [nativeTextFrame];
const testCauseFrameStrs = testCauseFrames.map((frame) => frame.text);
const testCauseStack = `${testCauseHeader}\n${testCauseFrameStrs.join('\n')}`;
const testCauseNode = {
  type: 'Error',
  prefix: undefined,
  name: { type: 'ErrorName', name: testCauseName },
  message: { type: 'ErrorMessage', message: testCauseMessage },
  frames: testCauseFrames,
};

const testErrorsNode = {
  type: 'ErrorChain',
  errors: [testErrorNode, testCauseNode],
};

const makeTestCause = ({ message = testCauseMessage, stack = testCauseStack } = {}) => {
  const testCause = new Error(message);
  testCause.stack = stack;
  return testCause;
};

const makeTestErrors = ({
  message = testErrorMessage,
  stack = testErrorStack,
  cause = makeTestCause(),
} = {}) => {
  const testError = new TestError(message);
  testError.stack = stack;
  testError.cause = cause;
  return testError;
};

module.exports = {
  ...error,
  nativeTextFrame,
  testCauseName,
  testCauseMessage,
  testCauseHeader,
  testCauseFrames,
  testCauseFrameStrs,
  testCauseStack,
  testCauseNode,
  testErrorsNode,
  makeTestCause,
  makeTestErrors,
};
