export type ParsedError = {
  header: string;
  frames: Array<string>;
};

export function parseError(error: Error): ParsedError;

export function printErrorHeader(error: Error | ParsedError): string;

export function printFrames(error: Error | ParsedError): string;

export function printError(error: Error | ParsedError): string;

export function parseErrors(error: Error): Array<ParsedError>;

export function printErrorHeaders(error: Error | Array<ParsedError>): string;

export function printErrors(error: Error | Array<ParsedError>): string;
