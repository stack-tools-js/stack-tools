import { Options, ParsedError, PrintableError } from './types';

export function parseError(error: Error | string, options?: Options): ParsedError;

export function printError(error: Error | PrintableError | string, options?: Options): string;

export function cleanError(error: ParsedError): ParsedError;
