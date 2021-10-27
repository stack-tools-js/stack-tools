import { Options, ParsedError } from '../types';

declare function printError(error: Error | ParsedError, options?: Options): string;

export = printError;
