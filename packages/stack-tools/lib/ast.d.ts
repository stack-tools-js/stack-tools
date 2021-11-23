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

export type Node = ErrorChainNode | ErrorNode | ErrorNameNode | ErrorMessageNode | TextFrameNode;

export type NodeTypes = 'ErrorChain' | 'Error' | 'ErrorName' | 'ErrorMessage' | 'TextFrame';

export const nodeTypes: Record<NodeTypes, true>;

export type Context = Record<never, never>;

export class Visitors<O extends Record<string, unknown>> {
  options: O;

  static visit(node: Node, options: any): unknown;

  static suffixMatcher: RegExp;

  constructor(context: Context, options: O);

  visit(node: Node): unknown;

  ErrorChain?(chain: ErrorChainNode): unknown;
  Error?(error: ErrorNode): unknown;
  ErrorHeader?(error: ErrorNode): unknown;
  ErrorName?(name: ErrorNameNode): unknown;
  ErrorMessage?(message: ErrorMessageNode): unknown;
  Frames?(error: Array<FrameNode> | undefined): unknown;
  Frame?(frame: FrameNode): unknown;
  TextFrame?(frame: TextFrameNode): unknown;
}

export class PrintVisitors<O extends { frames?: boolean }> extends Visitors<O> {
  static visit(node: Node, options: any): string;

  visit(node: Node): string;

  ErrorChain(chain: ErrorChainNode): string;
  Error(error: ErrorNode): string;
  ErrorHeader(error: ErrorNode): string;
  ErrorName(name: ErrorNameNode): string;
  ErrorMessage(message: ErrorMessageNode): string;
  Frames(error: Array<FrameNode> | undefined): string;
  Frame(frame: FrameNode): string;
  TextFrame(frame: TextFrameNode): string;
}

export function printNode(node: Node, options: { frames?: boolean }): string;
