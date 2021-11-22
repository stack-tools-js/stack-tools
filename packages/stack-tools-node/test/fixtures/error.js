const base = require('../../../stack-tools-v8/test/fixtures/error.js');

const {
  TestError,
  testErrorFrames: testErrorFramesV8,
  testErrorFrameStrs: testErrorFrameStrsV8,
  testErrorMessage,
  testErrorHeader,
} = base;

const cjsLoaderFrame = {
  type: 'CallSiteFrame',
  callSite: {
    call: undefined,
    site: {
      type: 'FileSite',
      locator: { type: 'PathLocator', path: 'internal/cjs/loader.js' },
      position: { line: 2, column: 1 },
    },
  },
};
const cjsLoaderFrameStr = 'at internal/cjs/loader.js:2:1';

const testErrorFrames = [...testErrorFramesV8, cjsLoaderFrame];
const testErrorFrameStrs = [...testErrorFrameStrsV8, cjsLoaderFrameStr];
const testErrorFramesStr = testErrorFrameStrs.join('\n');
const testErrorStack = `${testErrorHeader}\n${testErrorFramesStr}`;

const makeTestError = ({ message = testErrorMessage, stack = testErrorStack } = {}) => {
  const testError = new TestError(message);
  testError.stack = stack;
  return testError;
};

module.exports = {
  ...base,
  cjsLoaderFrame,
  cjsLoaderFrameStr,
  testErrorFrames,
  testErrorFrameStrs,
  testErrorFramesStr,
  testErrorStack,
  makeTestError,
};
