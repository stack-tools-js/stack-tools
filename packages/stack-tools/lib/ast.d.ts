export type ErrorNameNode = {
  type: 'ErrorName';
  name: string;
};

export type ErrorMessageNode = {
  type: 'ErrorMessage';
  message: string;
};

export type ErrorPrefixNode = {
  type: 'ErrorPrefix';
  prefix: string;
};

export type TextFrameNode = {
  type: 'TextFrame';
  text: string;
};

export type FrameNode = TextFrameNode;

export type ErrorNode = {
  type: 'Error';
  prefix: ErrorPrefixNode | undefined;
  name: ErrorNameNode | undefined;
  message: ErrorMessageNode | undefined;
  frames: Array<FrameNode> | undefined;
};

export type ErrorChainNode = {
  type: 'ErrorChain';
  errors: Array<ErrorNode>;
};

export type Node =
  | ErrorChainNode
  | ErrorNode
  | ErrorNameNode
  | ErrorMessageNode
  | ErrorPrefixNode
  | TextFrameNode;

export type NodeTypes = Node['type'];

export const nodeTypes: Record<NodeTypes, true>;

export type Context = Record<never, never>;

export class Visitor<O extends Record<string, unknown>> {
  options: O;

  static visit(node: Node, options: any): unknown;

  static suffixMatcher: RegExp;

  constructor(context: Context, options?: O);

  visit(node: Node | undefined): unknown;

  ErrorChain?(chain: ErrorChainNode): unknown;
  Error?(error: ErrorNode): unknown;
  ErrorBody?(error: ErrorNode): unknown;
  ErrorHeader?(error: ErrorNode): unknown;
  ErrorName?(name: ErrorNameNode): unknown;
  ErrorMessage?(message: ErrorMessageNode): unknown;
  ErrorPrefix?(message: ErrorPrefixNode): unknown;
  Frames?(error: Array<FrameNode> | undefined): unknown;
  Frame?(frame: FrameNode): unknown;
  TextFrame?(frame: TextFrameNode): unknown;
}

export class PrintVisitor<O extends { frames?: boolean }> extends Visitor<O> {
  static visit(node: Node, options: any): string;

  visit(node: Node | undefined): string | undefined;

  ErrorChain(chain: ErrorChainNode): string;
  Error(error: ErrorNode): string;
  ErrorBody(error: ErrorNode): string | undefined;
  ErrorHeader(error: ErrorNode): string | undefined;
  ErrorName(name: ErrorNameNode): string | undefined;
  ErrorMessage(message: ErrorMessageNode): string | undefined;
  ErrorPrefix(message: ErrorPrefixNode): string | undefined;
  Frames(error: Array<FrameNode> | undefined): string | undefined;
  Frame(frame: FrameNode): string;
  TextFrame(frame: TextFrameNode): string;
}

export function printNode(node: Node, options?: { frames?: boolean }): string;
