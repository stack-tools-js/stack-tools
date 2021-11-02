import { ParsedError } from './types';

export function parseError(error: Error): ParsedError;

export function printErrorHeader(error: Error | ParsedError): string;

export function printError(error: Error | ParsedError): string;
