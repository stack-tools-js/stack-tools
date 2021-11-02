# stack-tools

`stack-tools` provides utilites for printing and parsing errors and their stacks.

## Usage

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

## API

Utilities that work with stacks from any environment are in the `stack-tools` module, otherwise known as the base module. Parameters called `error` (other than `parseError(error)`) accept either an instance of `Error` (or one of its subtypes) or a `ParsedError` as returned by `parseError(error)`, which is defined as:

```ts
type ParsedError {
  header: string; // equivalent to printErrorHeader(error)
  frames: Array<string>;
}
```

The base API provides the following methods:

- `parseError(error)` returns `` {header: `${error.name}: ${error.message}`, frames: Array<string>}` ``.
- `parseErrors(errors)` returns an array of parsed errors
- `printFrames(error)` returns the frames of `error.stack` as a string, omitting the header text.
- `printErrorHeader(error)` returns `` `${name}: ${message}` ``
- `printErrorHeaders(error)` returns `` `${printErrorHeader(error)}\nCaused by: ${printErrorHeaders(error.cause)}` ``
- `printError(error)` returns `` `${printHeader(errror)}\n${error.stack}` ``
- `printErrors(error)` returns `` `${printError(error)}\nCaused by: ${printErrors(error.cause)}` ``

## Platform-specific APIs

The platform-specific API allows parsing and reprinting of errors. **Parsing errors is a best-effort process, and you must never use the results of parsing an error to define business logic. The only supported usage of output from parseError is as input to printError.** These APIs exist to allow you to reformat errors which may contain unhelpful cruft.

### v8

Utilities for working with v8 stacks (used by node, Chrome, and Chromium based browsers such as Opera and IE Edge) are in the `stack-tools/v8` module. The type of `ParsedError` differs slightly from the base API. For `v8` it is:

```ts
type ParsedError = {
  header: string;
  frames: Array<Frame>;
  prefix: string; // 'Caused by:' or other similar text ending in ':'
};

type Frame = {
  call: Call | null;
  site: Site;
  eval: {
    call: Call | null;
    site: Site;
  };
};

type Call = {
  async: boolean;
  constructor: boolean;
  function: string;
  method: string;
};

type Site =
  | {
      type: 'anonymous';
      column?: number;
      line?: number;
    }
  | {
      type: 'native';
    }
  | {
      type: 'path';
      path: string;
      column: number;
      line: number;
    }
  | {
      type: 'uri';
      scheme: string;
      path: string;
      column: number;
      line: number;
    }
  | {
      type: 'index';
      index: number;
    };
```

v8 defines all the methods from the base API with wider types so that parsed outputs are always usable as inputs (e.g. as `printError(parseError(error)`). v8 overrides the implementations of some methods from the base API:

- `printErrorHeaders(error)` returns `` `${printErrorHeader(error)}\n${error.prefix}: ${printErrorHeaders(error.cause)}` ``
- `printErrors(error)` returns `` `${printError(error)}\n${error.prefix}: ${printErrors(error.cause)}` ``

It also defines the following additional methods:

- `isInternalFrame(frame)` returns `true` if frame is internal.
- `cleanError(error, predicate = isInternalFrame)` mutates `error.stack`, filtering out internal frames. Returns `error`.
- `cleanErrors(errors, predicate = isInternalFrame)` for each error mutates `error.stack`, filtering out internal frames. Returns `errors`.

A common usage might look like this:

```js
import {
  parseErrors,
  cleanErrors,
  printErrors,
} from 'stack-tools/v8';

try {
  doStuff();
} catch (e) {
  const errors = parseErrors(e);

  cleanErrors(errors);

  console.error(printErrors(errors));
}
```

### node

The node environment extends the v8 environment with a definition of `isInternalFrame` includes node internal modules (e.g. `fs`).

Here is a common use case:

```js
import getPackageName from 'get-package-name';
import {
  isInternalFrame as isNodeInternalFrame,
  parseErrors,
  cleanErrors,
  printErrors,
} from 'stack-tools/node';

const internalPackages = new Set([
  'my-package',
  'test-runner',
]);

const isInternalFrame = (frame) => {
  return (
    isNodeInternalFrame(frame) ||
    (frame.site.type === 'file' &&
      internalPackages.has(getPackageName(frame.site.file)))
  );
};

try {
  doStuff();
} catch (e) {
  const errors = parseErrors(e);

  cleanErrors(errors, isInternalFrame);

  console.error(printErrors(errors));
}
```
