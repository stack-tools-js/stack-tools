import { Options, ParsedError } from '../types';

declare function printErrors(errors: Error | Array<ParsedError>, options?: Options): string;

export = printErrors;
