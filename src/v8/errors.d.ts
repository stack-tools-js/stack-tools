import { Options, ParsedError } from './types';

export function parseErrors(error: Error | string, options?: Options): Array<ParsedError>;

export function printErrors(errors: Error | Array<ParsedError>, options?: Options): string;

export function cleanErrors(errors: Array<ParsedError>): Array<ParsedError>;
