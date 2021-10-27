import { Options, ParsedError } from '../types';

declare function parseError(error: Error | string, options?: Options): ParsedError;

export = parseError;
