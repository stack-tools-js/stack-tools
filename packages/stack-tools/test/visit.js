const test = require('ava');

const { printNode, PrintVisitor } = require('stack-tools');
const { testErrorName } = require('../../../test/fixtures/error.js');

test('can print a node', (t) => {
  const errorNameNode = { type: 'ErrorName', name: testErrorName };
  t.is(printNode(errorNameNode), testErrorName);
  t.is(PrintVisitor.visit(errorNameNode), testErrorName);
  t.throws(() => printNode({}));
});
