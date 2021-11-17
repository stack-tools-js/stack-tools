# stack-tools

`stack-tools` provides utilites for printing and parsing errors and their stacks. It can help with a number of common tasks like printing causal chains of errors (i.e. errors that reference to other errors through an `error.cause` property). It can also help you truncate stack frames present due to error generation.

## Usage

Here are some of the most common usages of stack tools:

When code in your application or a library throws errors with `error.cause` properties, you can use `stack-tools` to print them so that all information about the error is preserved.

```js
import { printErrors } from 'stack-tools';

try {
  const baseError = new Error('base');
  const wrapperError = new Error('wrapper');
  baseError.cause = wrapperError;

  throw wrapperError;
} catch (e) {
  console.error(printErrors(error));
  // Error: wrapper
  //    at <anonymous>:5:28
  // Caused by: Error: base
  //    at <anonymous>:4:25
}
```

Sometimes it is useful to reuse some code for building errors, but that code tends to end up on the stack, where it makes it harder for the developer to spot where the program entered a throw code path. `stack-tools` can be used to omit some frames.

```js
import { parseError, printError } from 'stack-tools';

function makeBeautifulError() {
  const err = new Error('Everything else has gone wrong');

  const parsed = parseError(err);
  parsed.stack = parsed.stack.slice(1);
  err.stack = printError(parsed);

  return err;
}
```

If `error.cause` is overkill for your needs, you can add some extra information to an error by replacing its message. This function ensures that `error.stack` is also updated appropriately.

```js
import { replaceMessage } from 'stack-tools';

const id;
try {
  /* */
} catch(e) {
  replaceMessage(e, `${e.message}\nid: ${id}`)
}
```

## API

Utilities that work with stacks from any environment are in the `stack-tools` module, otherwise known as the base module.

The following methods are provided:

- `replaceMessage(error, message)` replaces `error.message` with `message` and also updates the text of `error.stack`. `message` may also be a `message => newMessage` callback.
- `getErrors(error)` returns an array of causally chained errors, e.g. `[error, error.cause, error.cause.cause]`,
- `parseError(error, ?options)` returns an error AST node. For more info see the [AST type definitions](https://github.com/stack-tools-js/stack-tools/tree/trunk/packages/stack-tools/lib/ast.d.ts).
- `parseErrors(errors, ?options)` returns an array of error AST nodes.
- `printError(error, ?options)` returns `` `${printHeader(errror)}\n${error.stack}` ``
- `printErrors(error, ?options)` returns `` `${printError(error)}\nCaused by: ${printErrors(error.cause)}` ``

The following options are provided:

- `options.frames` (default: `true`) indicates whether frame data should be parsed or printed. For parse methods `frames: false` will cause `error.frames` to be `undefined`. For print methods frames will not be printed even if they are present in an argument AST.
