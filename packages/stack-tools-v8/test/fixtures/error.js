const base = require('../../../../test/fixtures/error.js');

const { TestError, testErrorMessage, testErrorHeader } = base;

const nativeFrame = { call: null, site: { type: 'native' } };
const nativeFrameStr = '    at native';
const fileFooFrame = { call: null, site: { type: 'path', path: 'foo.js', line: 1, column: 1 } };
const fileFooFrameStr = '    at foo.js:1:1';

const testErrorFrames = [fileFooFrame, nativeFrame];
const testErrorFrameStrs = [fileFooFrameStr, nativeFrameStr];
const testErrorFramesStr = testErrorFrameStrs.join('\n');
const testErrorStack = `${testErrorHeader}\n${testErrorFramesStr}`;

const makeTestError = ({ message = testErrorMessage, stack = testErrorStack } = {}) => {
  const testError = new TestError(message);
  testError.stack = stack;
  return testError;
};

module.exports = {
  ...base,
  nativeFrame,
  nativeFrameStr,
  fileFooFrame,
  fileFooFrameStr,
  testErrorFrames,
  testErrorFrameStrs,
  testErrorFramesStr,
  testErrorStack,
  makeTestError,
};
