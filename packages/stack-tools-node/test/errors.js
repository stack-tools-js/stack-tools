const test = require('ava');

const { parseErrors, cleanErrors } = require('@stack-tools/node-tools');

const {
  fileFooFrame,
  fileBarFrame,
  testErrorNode,
  testCauseNode,
  makeTestErrors,
} = require('./fixtures/errors.js');

const ErrorChain = (errors) => ({ type: 'ErrorChain', errors });

test('cleans a causal chain of errors', (t) => {
  t.deepEqual(
    cleanErrors(parseErrors(makeTestErrors())),
    ErrorChain([
      {
        ...testErrorNode,
        frames: [fileFooFrame],
      },
      {
        ...testCauseNode,
        frames: [fileBarFrame],
      },
    ]),
  );
});
