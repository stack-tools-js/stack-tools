import type { ErrorNode } from './ast';

export * from './ast';

export function getErrorChain(error: Error): Array<Error>;

export function parseError(error: Error | ErrorNode): ErrorNode;

export function replaceMessage(
  error: Error,
  message: string | ((message: string) => string),
): Error;

export function printError(error: Error | ErrorNode): string;

export function parseErrors(error: Error | Array<ErrorNode | Error>): Array<ErrorNode>;

export function printErrors(error: Error | Array<ErrorNode>): string;
