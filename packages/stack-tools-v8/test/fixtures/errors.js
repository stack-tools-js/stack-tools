const base = require('./error.js');

const {
  testCauseName,
  testCauseMessage,
  testCauseHeader,
} = require('../../../../test/fixtures/errors.js');

const {
  TestError,
  nativeFrame,
  nativeFrameStr,
  fileFooFrame,
  fileFooFrameStr,
  testErrorMessage,
  testErrorFrames,
  testErrorStack,
} = base;

const fileBarFrame = { call: null, site: { type: 'path', path: 'bar.js', line: 22, column: 8 } };
const fileBarFrameStr = '    at bar.js:22:8';

const testCauseFrames = [fileBarFrame];
const testCauseStack = `${testCauseHeader}\n${fileBarFrameStr}`;
const testCause = new Error(testCauseMessage);

testCause.stack = testCauseStack;

const testError = new TestError(testErrorMessage);

testError.stack = testErrorStack;
testError.cause = testCause;

module.exports = {
  ...base,
  nativeFrame,
  nativeFrameStr,
  fileFooFrame,
  fileFooFrameStr,
  fileBarFrame,
  fileBarFrameStr,
  testCauseName,
  testCauseMessage,
  testCauseHeader,
  testCauseFrames,
  testCauseStack,
  testCause,
  testErrorFrames,
  testErrorStack,
  testError,
};
