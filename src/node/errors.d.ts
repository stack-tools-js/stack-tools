import type { Frame, ParsedError } from '../v8';

export * from '../v8/errors';

export function cleanErrors(
  errors: Array<ParsedError>,
  predicate: (frame: Frame) => boolean,
): string;
