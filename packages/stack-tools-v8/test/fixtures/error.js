const base = require('../../../../test/fixtures/error.js');

const { TestError, testErrorName, testErrorMessage, testErrorHeader } = base;

const nativeFrame = {
  type: 'CallSiteFrame',
  callSite: { call: undefined, site: { type: 'NativeSite' } },
  evalCallSite: undefined,
};
const nativeFrameStr = '    at native';
const fileFooPath = '/home/foo.js';
const fileFooFrame = {
  type: 'CallSiteFrame',
  callSite: {
    call: undefined,
    site: {
      type: 'FileSite',
      locator: { type: 'PathLocator', path: fileFooPath },
      position: {
        type: 'Position',
        line: 1,
        column: 1,
      },
    },
  },
  evalCallSite: undefined,
};
const fileFooFrameStr = '    at /home/foo.js:1:1';

const testErrorFrames = [fileFooFrame, nativeFrame];
const testErrorFrameStrs = [fileFooFrameStr, nativeFrameStr];
const testErrorFramesStr = testErrorFrameStrs.join('\n');
const testErrorStack = `${testErrorHeader}\n${testErrorFramesStr}`;
const testErrorNode = {
  type: 'Error',
  name: { type: 'ErrorName', name: testErrorName },
  message: { type: 'ErrorMessage', message: testErrorMessage },
  frames: testErrorFrames,
  prefix: undefined,
};

const makeTestError = ({ message = testErrorMessage, stack = testErrorStack } = {}) => {
  const testError = new TestError(message);
  testError.stack = stack;
  return testError;
};

module.exports = {
  ...base,
  nativeFrame,
  nativeFrameStr,
  fileFooPath,
  fileFooFrame,
  fileFooFrameStr,
  testErrorFrames,
  testErrorFrameStrs,
  testErrorFramesStr,
  testErrorStack,
  testErrorNode,
  makeTestError,
};
