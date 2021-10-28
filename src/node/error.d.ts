import type { Frame, ParsedError } from '../v8';

export * from '../v8/error';

export function cleanError(error: ParsedError, predicate: (frame: Frame) => boolean): string;
