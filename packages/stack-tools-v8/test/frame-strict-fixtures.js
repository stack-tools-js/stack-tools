'use strict';

const test = require('ava');
const cases = require('./fixtures/frame');
const { parseFrameStrict } = require('../lib/internal/frame-strict');

const someOnly = cases.some(({ only }) => only);

for (const { object, string, strict, only } of cases) {
  if ((!someOnly || only) && strict) {
    const printable = JSON.stringify(string).slice(1, -1);

    test(printable.replace(/^[ \t]*at[ \t]+/, ''), (t) => {
      const expected = object;

      t.deepEqual(parseFrameStrict(string), expected);
    });
  }
}
