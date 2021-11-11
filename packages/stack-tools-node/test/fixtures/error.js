const base = require('../../../stack-tools-v8/test/fixtures/error.js');

const {
  TestError,
  testErrorFrames: testErrorFramesV8,
  testErrorFrameStrs: testErrorFrameStrsV8,
  testErrorMessage,
  testErrorHeader,
} = base;

const fsFrame = {
  type: 'CallSiteFrame',
  callSite: {
    call: undefined,
    site: {
      type: 'FileSite',
      locator: { type: 'PathLocator', path: 'node:fs' },
      position: { line: 2, column: 1 },
    },
  },
};
const fsFrameStr = 'at node:fs:2:1';

const testErrorFrames = testErrorFramesV8.concat([fsFrame]);
const testErrorFrameStrs = testErrorFrameStrsV8.concat([fsFrameStr]);
const testErrorFramesStr = testErrorFrameStrs.join('\n');
const testErrorStack = `${testErrorHeader}\n${testErrorFramesStr}`;

const makeTestError = ({ message = testErrorMessage, stack = testErrorStack } = {}) => {
  const testError = new TestError(message);
  testError.stack = stack;
  return testError;
};

module.exports = {
  ...base,
  fsFrame,
  fsFrameStr,
  testErrorFrames,
  testErrorFrameStrs,
  testErrorFramesStr,
  testErrorStack,
  makeTestError,
};
