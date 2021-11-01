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
      type: 'file';
      file: string;
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
  message: string;
  stack: Array<Frame>;
};

export type PrintableError = {
  prefix?: string;
  message: string;
  stack: string | Array<Frame | string>;
};
