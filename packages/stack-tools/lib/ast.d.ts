export type ErrorNameNode = {
  type: 'ErrorName';
  name: string;
};

export type ErrorMessageNode = {
  type: 'ErrorMessage';
  message: string;
};

export type TextFrameNode = {
  type: 'TextFrame';
  text: string;
};

export type FrameNode = TextFrameNode;

export type ErrorNode = {
  type: 'Error';
  name: ErrorNameNode | undefined;
  message: ErrorMessageNode | undefined;
  frames: Array<FrameNode> | undefined;
};

export type ErrorChainNode = {
  type: 'ErrorChain';
  errors: Array<ErrorNode>;
};
