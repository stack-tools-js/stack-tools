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

Utilities that work with stacks from any environment are in the `stack-tools` module, otherwise known as the base module. Parameters called `error` (other than `parseError(error)`) accept either an instance of `Error` (or one of its subtypes) or a `ParsedError` as returned by `parseError(error)`, which is defined as:

```ts
type ParsedError {
  name: string;
  message: string;
  frames: Array<string>;
}
```

The following methods are provided:

- `getErrors(error)` returns an array of causally related errors, e.g. `[error, error.cause, error.cause.cause]`,
- `parseError(error)` returns `` { name, message, frames: Array<string>}` ``.
- `replaceMessage(error, message)` replaces `error.message` with `message` and also updates the text of `error.stack`. `message` may also be a `message => newMessage` callback.
- `parseErrors(errors)` returns an array of parsed errors
- `printFrames(error)` returns the frames of `error.stack` as a string, omitting the header text.
- `printErrorHeader(error)` returns `` `${name}: ${message}` ``
- `printErrorHeaders(error)` returns `` `${printErrorHeader(error)}\nCaused by: ${printErrorHeaders(error.cause)}` ``
- `printError(error)` returns `` `${printHeader(errror)}\n${error.stack}` ``
- `printErrors(error)` returns `` `${printError(error)}\nCaused by: ${printErrors(error.cause)}` ``
