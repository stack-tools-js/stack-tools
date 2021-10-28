import { Options, ParsedError } from './types';

export function parseError(error: Error | string, options?: Options): ParsedError;

export function printError(error: Error | ParsedError, options?: Options): string;

export function cleanError(error: ParsedError): ParsedError;
