const test = require('ava');

const { parseError, printError } = require('../../src/v8');

const nativeFrame = { call: null, site: { type: 'native' } };

test('works when there are no stack frames', (t) => {
  const stack = 'ReferenceError: a is not defined';

  const parsed = parseError(stack);

  t.deepEqual(parsed, {
    name: 'ReferenceError',
    message: 'a is not defined',
    frames: [],
  });

  t.is(printError(parsed), stack);
});

test('eliminates extra whitespace at the beginning end of message and frames', (t) => {
  const stack = 'ReferenceError:   a is not defined\n\nat native  ';

  const parsed = parseError(stack);

  t.deepEqual(parsed, {
    name: 'ReferenceError',
    message: 'a is not defined',
    frames: [nativeFrame],
  });
});
