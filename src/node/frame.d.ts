import type { Frame } from '../v8';

export * from '../v8/frame';

export function isInternalFrame(frame: Frame): boolean;

export function captureFrames(omitFrames: number | Function): string;
