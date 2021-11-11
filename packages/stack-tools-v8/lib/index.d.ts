import type { ErrorNode, FrameNode } from './ast';

export * from './ast';

export type Options = {
  // If strict, throw an error when error.stack contains causes
  // In strict mode causes are expected to be expressed using error.cause
  // I expect that most users will want to leave strict mode disabled
  strict?: boolean;
  frames?: boolean;
};

export function parseFrame(error: Error | FrameNode | string): FrameNode;

export function printFrame(frame: FrameNode | string): string;

export function isInternalFrame(frame: FrameNode): boolean;

export function parseError(error: Error | string | ErrorNode, options?: Options): ErrorNode;

export function printError(error: Error | ErrorNode, options?: Options): string;

export function cleanError(error: ErrorNode): ErrorNode;

export function parseErrors(
  error: Error | string | Array<Error | string | ErrorNode>,
  options?: Options,
): Array<ErrorNode>;

export function printErrors(errors: Error | Array<Error | ErrorNode>, options?: Options): string;

export function cleanErrors(errors: Array<ErrorNode>): Array<ErrorNode>;
