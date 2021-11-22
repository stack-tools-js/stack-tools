import type {
  NodeTypes as BaseNodeTypes,
  Visitors as BaseVisitors,
  PrintVisitors as BasePrintVisitors,
  ErrorNameNode,
  ErrorMessageNode,
  TextFrameNode,
} from 'stack-tools';

export { ErrorNameNode, ErrorMessageNode, TextFrameNode };

export type CallNode = {
  type: 'Call';
  async: boolean;
  constructor: boolean;
  function: string;
  method: string;
};

export type PathLocatorNode = {
  type: 'PathLocator';
  path: string;
};

export type URILocatorNode = {
  type: 'URILocator';
  scheme: string;
  path: string;
};

export type AnonymousLocatorNode = {
  type: 'AnonymousLocator';
};

export type LocatorNode = PathLocatorNode | URILocatorNode | AnonymousLocatorNode;

export type PositionNode = {
  type: 'Position';
  line: number;
  column: number;
};

export type AnonymousSiteNode = {
  type: 'AnonymousSite';
};

export type NativeSiteNode = {
  type: 'NativeSite';
};

export type FileSiteNode = {
  type: 'FileSite';
  locator: LocatorNode;
  position: PositionNode;
};

export type IndexSiteNode = {
  type: 'IndexSite';
  index: number;
};

export type SiteNode = AnonymousSiteNode | NativeSiteNode | FileSiteNode | IndexSiteNode;

export type CallSite = {
  call: CallNode | undefined;
  site: SiteNode;
};

export type CallSiteFrameNode = {
  type: 'CallSiteFrame';
  callSite: CallSite;
};

export type OmittedFrameNode = {
  type: 'OmittedFrame';
};

export type FrameNode = TextFrameNode | CallSiteFrameNode | OmittedFrameNode;

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

export type Node =
  | ErrorNameNode
  | ErrorMessageNode
  | TextFrameNode
  | CallSiteFrameNode
  | OmittedFrameNode
  | CallNode
  | AnonymousSiteNode
  | NativeSiteNode
  | FileSiteNode
  | IndexSiteNode
  | AnonymousLocatorNode
  | PathLocatorNode
  | URILocatorNode
  | PositionNode
  | ErrorNode
  | ErrorChainNode;

export type NodeTypes =
  | BaseNodeTypes
  | 'CallSiteFrame'
  | 'OmittedFrame'
  | 'Call'
  | 'AnonymousSite'
  | 'NativeSite'
  | 'FileSite'
  | 'IndexSite'
  | 'AnonymousLocator'
  | 'PathLocator'
  | 'URILocator'
  | 'Position';

export const nodeTypes: Record<NodeTypes, true>;

export type Context = Record<never, never>;

export class Visitors<O extends Record<string, unknown>> extends BaseVisitors<O> {
  static visit(node: Node, options: any): unknown;

  visit(node: Node): unknown;

  CallSiteFrame?(frame: CallSiteFrameNode): unknown;
  OmittedFrame?(frame: OmittedFrameNode): unknown;
  Frame?(frame: FrameNode): unknown;
  Call?(call: CallNode): unknown;
  AnonymousSite?(site: AnonymousSiteNode): unknown;
  NativeSite?(site: NativeSiteNode): unknown;
  FileSite?(site: FileSiteNode): unknown;
  IndexSite?(site: IndexSiteNode): unknown;
  Site?(site: SiteNode): unknown;
  AnonymousLocator?(locator: AnonymousLocatorNode): unknown;
  PathLocator?(locator: PathLocatorNode): unknown;
  URILocator?(locator: URILocatorNode): unknown;
  Locator?(locator: LocatorNode): unknown;
  Position?(position: PositionNode): unknown;
  Error?(error: ErrorNode): unknown;
  ErrorChain?(error: ErrorChainNode): unknown;
}

export class PrintVisitors<O extends { frames?: boolean }> extends BasePrintVisitors<O> {
  static visit(node: Node, options: any): string;

  visit(node: Node): string;

  CallSiteFrame(frame: CallSiteFrameNode): string;
  OmittedFrame(frame: OmittedFrameNode): string;
  Frame(frame: FrameNode): string;
  Call(call: CallNode): string;
  AnonymousSite(site: AnonymousSiteNode): string;
  NativeSite(site: NativeSiteNode): string;
  FileSite(site: FileSiteNode): string;
  IndexSite(site: IndexSiteNode): string;
  Site(site: SiteNode): string;
  AnonymousLocator(locator: AnonymousLocatorNode): string;
  PathLocator(locator: PathLocatorNode): string;
  URILocator(locator: URILocatorNode): string;
  Locator(locator: LocatorNode): string;
  Position(position: PositionNode): string;
  Error(error: ErrorNode): string;
  ErrorChain(error: ErrorChainNode): string;
}
