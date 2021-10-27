import { Options, ParsedError } from '../types';

declare function parseErrors(error: Error | string, options?: Options): Array<ParsedError>;

export = parseErrors;
