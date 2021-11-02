import { Frame } from './types';

export function parseFrame(error: Error | string): Frame;

export function printFrame(frame: Frame | string): string;

export function isInternalFrame(frame: Frame): boolean;
