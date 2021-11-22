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
  testErrorNode,
} = base;

const fileBarFrame = {
  type: 'CallSiteFrame',
  callSite: {
    call: undefined,
    site: {
      type: 'FileSite',
      locator: { type: 'PathLocator', path: 'bar.js' },
      position: {
        type: 'Position',
        line: 22,
        column: 8,
      },
    },
  },
};
const fileBarFrameStr = '    at bar.js:22:8';

const testCauseFrames = [fileBarFrame];
const testCauseStack = `${testCauseHeader}\n${fileBarFrameStr}`;
const testCauseNode = {
  type: 'Error',
  name: { type: 'ErrorName', name: testCauseName },
  message: { type: 'ErrorMessage', message: testCauseMessage },
  frames: testCauseFrames,
  prefix: undefined,
};
const testErrorsNode = {
  type: 'ErrorChain',
  errors: [testErrorNode, testCauseNode],
};

const makeTestCause = () => {
  const testCause = new Error(testCauseMessage);
  testCause.stack = testCauseStack;
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
  testCauseNode,
  testErrorsNode,
  makeTestCause,
  testErrorFrames,
  testErrorStack,
  makeTestErrors,
};
