import { Options, ParsedError, PrintableError } from './types';

export function parseError(error: Error | string, options?: Options): ParsedError;

export function printError(error: Error | PrintableError, options?: Options): string;

export function printErrorHeader(error: Error | PrintableError): string;

export function printFrames(error: Error | PrintableError): string;

export function cleanError(error: ParsedError): ParsedError;
