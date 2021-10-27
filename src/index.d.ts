export type ParsedError = {
  prefix?: string;
  message: string;
  stack: string;
};

export function printFrames(error: Error): string;

export function printErrorHeader(error: Error | ParsedError): string;

export function printErrorHeaders(error: Error | ParsedError): string;

export function printError(error: Error | ParsedError): string;

export function printErrors(error: Error): string;

export function captureFrames(omitFrames: number): string;
