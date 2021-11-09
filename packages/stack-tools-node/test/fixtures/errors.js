const base = require('../../../stack-tools-v8/test/fixtures/errors.js');
const {
  TestError,
  fsFrame,
  fsFrameStr,
  testErrorFrames,
  testErrorFrameStrs,
  testErrorFramesStr,
  testErrorStack,
  testErrorMessage,
} = require('./error.js');

const { testCause } = base;

const testError = new TestError(testErrorMessage);

testError.stack = testErrorStack;
testError.cause = testCause;

module.exports = {
  ...base,
  fsFrame,
  fsFrameStr,
  testErrorFrames,
  testErrorFrameStrs,
  testErrorFramesStr,
  testErrorStack,
  testError,
};
