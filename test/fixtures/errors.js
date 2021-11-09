const {
  TestError,
  testErrorName,
  testErrorMessage,
  testErrorHeader,
  testErrorFrames,
  testErrorStack,
} = require('./error.js');

const testCauseName = 'Error';
const testCauseMessage = 'the system is down';
const testCauseHeader = `${testCauseName}: ${testCauseMessage}`;
const testCauseFrames = [`    at native`];
const testCauseStack = `${testCauseHeader}\n${testCauseFrames.join('\n')}`;
const testCause = new Error(testCauseMessage);

testCause.stack = testCauseStack;

const makeTestErrors = ({
  message = testErrorMessage,
  stack = testErrorStack,
  cause = testCause,
} = {}) => {
  const testError = new TestError(message);
  testError.stack = stack;
  testError.cause = cause;
  return testError;
};

module.exports = {
  TestError,
  testCauseName,
  testCauseMessage,
  testCauseHeader,
  testCauseFrames,
  testCauseStack,
  testCause,
  testErrorName,
  testErrorMessage,
  testErrorHeader,
  testErrorFrames,
  testErrorStack,
  makeTestErrors,
};
