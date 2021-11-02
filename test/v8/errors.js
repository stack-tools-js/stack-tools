const test = require('ava');
const { stripIndent } = require('common-tags');

const { parseErrors, printErrors } = require('../../lib/v8');

test('can reprint a string error', (t) => {
  const stack = stripIndent`
  ReferenceError: a is not defined
    at mostInner (/home/conartist6/dev/repos/stack-utils/test/fixtures/produce-long-stack-traces.js:10:5)
  From previous event:
    at evenMoreInner (/home/conartist6/dev/repos/stack-utils/test/fixtures/produce-long-stack-traces.js:9:29)
  From previous event: Bogus message
    at Object.<anonymous> (/home/conartist6/dev/repos/stack-utils/test/fixtures/produce-long-stack-traces.js:6:36)
    at Module._compile (internal/modules/cjs/loader.js:1072:14)
    at Module._extensions..js (internal/modules/cjs/loader.js:1101:10)`;

  const parsed = parseErrors(stack);

  t.like(parsed[0], {
    name: 'ReferenceError',
    message: 'a is not defined',
  });
  t.like(parsed[1], {
    prefix: 'From previous event',
    name: '',
    message: '',
  });
  t.like(parsed[2], {
    prefix: 'From previous event',
    name: '',
    message: 'Bogus message',
  });

  t.is(printErrors(parsed), stack);
});
