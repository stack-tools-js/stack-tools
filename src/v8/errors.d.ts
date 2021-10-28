import { Options, ParsedError, PrintableError } from './types';

export function parseErrors(error: Error | string, options?: Options): Array<ParsedError>;

export function printErrors(
  errors: Error | Array<PrintableError | string>,
  options?: Options,
): string;

export function cleanErrors(errors: Array<ParsedError>): Array<ParsedError>;
