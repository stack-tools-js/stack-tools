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

export type LocatorNode = PathLocatorNode | URILocatorNode;

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

export type TextFrameNode = {
  type: 'TextFrame';
  text: string;
};

export type CallSiteFrameNode = {
  type: 'CallSiteFrame';
  callSite: CallSite;
};

export type EvalFrameNode = {
  type: 'EvalFrame';
  callSite: CallSite;
  evalCallSite: CallSite | undefined;
};

export type OmittedFrameNode = {
  type: 'OmittedFrameNode';
};

export type FrameNode = TextFrameNode | CallSiteFrameNode | EvalFrameNode | OmittedFrameNode;

export type ErrorNameNode = {
  type: 'ErrorName';
  name: string;
};

export type ErrorMessageNode = {
  type: 'ErrorMessage';
  message: string;
};

export type ErrorNode = {
  type: 'Error';
  name: ErrorNameNode | undefined;
  message: ErrorMessageNode | undefined;
  frames: Array<FrameNode> | undefined;
};
