import { ParsedError } from './types';

export function parseErrors(error: Error): Array<ParsedError>;

export function printErrorHeaders(error: Error | Array<ParsedError>): string;

export function printErrors(error: Error | Array<ParsedError>): string;
