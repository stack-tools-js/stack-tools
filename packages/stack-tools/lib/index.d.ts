import type { ErrorNode, ErrorChainNode } from './ast';

export * from './ast';

export function getErrors(error: Error): Array<Error>;

export function replaceMessage(
  error: Error,
  message: string | ((message: string) => string),
): Error;

export function parseError(error: Error | ErrorNode): ErrorNode;

export function printError(error: Error | ErrorNode): string;

export function parseErrors(error: Error | ErrorChainNode): ErrorChainNode;

export function printErrors(error: Error | ErrorChainNode): string;
