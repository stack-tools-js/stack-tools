import { Frame } from '../types';

declare function parseFrame(error: Error | string): Array<Frame>;

export = parseFrame;
