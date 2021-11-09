const base = require('../../../stack-tools-v8/test/fixtures/error.js');

const {
  TestError,
  testErrorFrames: testErrorFramesV8,
  testErrorFrameStrs: testErrorFrameStrsV8,
  testErrorMessage,
  testErrorHeader,
} = base;

const fsFrame = { call: null, site: { type: 'path', path: 'node:fs', line: 1, column: 1 } };
const fsFrameStr = 'at node:fs:1:1';

const testErrorFrames = testErrorFramesV8.concat([fsFrame]);
const testErrorFrameStrs = testErrorFrameStrsV8.concat([fsFrameStr]);
const testErrorFramesStr = testErrorFrameStrs.join('\n');
const testErrorStack = `${testErrorHeader}\n${testErrorFramesStr}`;

const testError = new TestError(testErrorMessage);

testError.stack = testErrorStack;

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
