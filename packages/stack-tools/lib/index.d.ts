export type ParsedError = {
  header: string;
  frames: Array<string>;
};

export function getErrors(error: Error): Array<Error>;

export function parseError(error: Error): ParsedError;

export function replaceMessage(
  error: Error,
  message: string | ((message: string) => string),
): Error;

export function printErrorHeader(error: Error | ParsedError): string;

export function printFrames(error: Error | ParsedError): string;

export function printError(error: Error | ParsedError): string;

export function parseErrors(error: Error): Array<ParsedError>;

export function printErrorHeaders(error: Error | Array<ParsedError>): string;

export function printErrors(error: Error | Array<ParsedError>): string;
