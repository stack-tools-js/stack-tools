export type Options = {
  // If strict, throw an error when error.stack contains causes
  // In strict mode causes are expected to be expressed using error.cause
  // I expect that most users will want to leave strict mode disabled
  strict?: boolean;
};

export type Call = {
  async: boolean;
  constructor: boolean;
  function: string;
  method: string;
};

export type Site =
  | {
      type: 'anonymous';
      column?: number;
      line?: number;
    }
  | {
      type: 'native';
    }
  | {
      type: 'path';
      path: string;
      column: number;
      line: number;
    }
  | {
      type: 'uri';
      uri: string;
      column: number;
      line: number;
    }
  | {
      type: 'index';
      index: number;
    };

export type CallSite = {
  call: Call | null;
  site: Site;
};

export type Frame = CallSite & {
  eval: CallSite;
};

export type ParsedError = {
  prefix?: string;
  header: string;
  frames: Array<Frame>;
};

export type PrintableError = {
  prefix?: string;
  header: string;
  frames: string | Array<Frame | string>;
};

export function parseFrame(error: Error | string): Frame;

export function printFrame(frame: Frame | string): string;

export function printFrames(error: Error | PrintableError): string;

export function isInternalFrame(frame: Frame): boolean;

export function parseError(error: Error | string, options?: Options): ParsedError;

export function printError(error: Error | PrintableError, options?: Options): string;

export function printErrorHeader(error: Error | PrintableError): string;

export function cleanError(error: ParsedError): ParsedError;

export function parseErrors(error: Error | string, options?: Options): Array<ParsedError>;

export function printErrors(errors: Error | Array<PrintableError>, options?: Options): string;

export function printErrorHeaders(errors: Error | Array<PrintableError>): string;

export function cleanErrors(errors: Array<ParsedError>): Array<ParsedError>;
