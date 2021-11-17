# @stack-tools/v8-tools

`v8-tools` provides utilites for printing and parsing v8 errors and their stacks. If you're not sure if your code will always run in a v8 environment, you will need to know before you use this tool to parse errors. If you are not sure, you should instead use the [stack-tools](https://github.com/stack-tools-js/stack-tools/tree/trunk/packages/stack-tools) package. Errors that can be parsed by this package will look more or less like this:

```
Error: A message about the error
    at someFunction (foo.js:10:2)
    at index.js:1:1
```

## What uses v8?

v8 is used in many common browsers including including Chrome, Chromium, IE Edge, and Opera, as well as in [node](https://nodejs.org/). If you are using node however, you should actually use the [node-tools](https://github.com/stack-tools-js/stack-tools/tree/trunk/packages/stack-tools-node) package.

The most notable browsers not using v8 are Firefox (using Spidermonkey) and Safari (using JavaScriptCore).

## Usage

```js
import {
  parseErrors,
  cleanErrors,
  printErrors,
} from '@stack-tools/v8-tools';

try {
  doStuff();
} catch (e) {
  const errors = parseErrors(e);

  cleanErrors(errors);

  console.error(printErrors(errors));
}
```

## API

The api for `node-tools` extends from the [stack-tools API](https://github.com/stack-tools-js/stack-tools/tree/trunk/packages/stack-tools#API). It is capable of more robust parsing though, and can even parse error strings, i.e. `parseError(err.stack)`, which the base `stack-tools` cannot. Furthermore it provides the most detailed output it can, specifically offering a `FrameNode` describing content of each frame. When parsing `ErrorNode.frames` will be an `Array<FrameNode>`. For details of the AST structure please read [ast.d.ts](https://github.com/stack-tools-js/stack-tools/tree/trunk/packages/stack-tools-v8/lib/ast.d.ts).

`v8-tools` overrides the implementations of some methods from the `stack-tools` API to provide support for custom chaining prefixes. Custom prefixes are usually the result of user tampering with `error.stack`, such as is done by [nested-error-stacks](https://www.npmjs.com/package/nested-error-stacks).

- `printErrors(error)` returns `` `${printError(error)}\n${error.prefix}: ${printErrors(error.cause)}` ``

`v8-tools` also defines the following additional methods:

- `parseFrame(frame)` returns a `FrameNode`
- `isInternalFrame(frame)` returns `true` if frame represents a location internal to the v8 runtime.
- `cleanError(error, predicate = isInternalFrame)` mutates `error.stack`, filtering out internal frames. Returns `error`.
- `cleanErrors(errors, predicate = isInternalFrame)` for each error mutates `error.stack`, filtering out internal frames. Returns `errors`.
