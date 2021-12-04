export { isError } from 'stack-tools';

import type { ErrorNode, ErrorChainNode, FrameNode, SiteNode } from './ast';
export * from './ast';

export type Options = {
  // If strict, throw an error when error.stack contains causes
  // In strict mode causes are expected to be expressed using error.cause
  // I expect that most users will want to leave strict mode disabled
  strict?: boolean;
  frames?: boolean;
  parseFrames?: boolean;
};

export function parseFrame(error: Error | FrameNode | string): FrameNode;

export function printFrame(frame: FrameNode | string): string;

export function isInternalFrame(frame: FrameNode | SiteNode): boolean;

export function getAbsoluteSitePath(frame: FrameNode | SiteNode): string | null;

export function parseError(error: Error | string | ErrorNode, options?: Options): ErrorNode;

export function printError(error: Error | ErrorNode, options?: Options): string;

export function cleanError(
  error: ErrorNode,
  isInternalFrame?: (frame: FrameNode) => boolean,
): ErrorNode;

export function parseErrors(
  error: Error | string | ErrorChainNode,
  options?: Options,
): ErrorChainNode;

export function printErrors(errors: Error | ErrorChainNode, options?: Options): string;

export function cleanErrors(
  errors: ErrorChainNode,
  isInternalFrame?: (frame: FrameNode) => boolean,
): ErrorChainNode;
