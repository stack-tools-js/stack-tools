# @stack-tools/node-tools

`node-tools` provides utilites for printing and parsing node errors and their stacks.

`node-tools` is a shim on top of [v8-tools](https://github.com/stack-tools-js/stack-tools/packages/stack-tools-v8) which expands the definition of `isInternalFrame` to include node internal modules like `fs`.

## Usage

```js
import getPackageName from 'get-package-name';
import {
  isInternalFrame as isNodeInternalFrame,
  parseErrors,
  cleanErrors,
  printErrors,
} from '@stack-tools/node-tools';

const internalPackages = new Set([
  'my-package',
  'test-runner',
]);

const isInternalFrame = (frame) => {
  return (
    isNodeInternalFrame(frame) ||
    (frame.site.type === 'path' &&
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
