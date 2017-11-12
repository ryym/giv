export type FetchOptions = {
  method?: string,
  headers?: {},
  body?: string,
};

export interface GitHubAPI {
  request(path: string, options?: FetchOptions): Promise<Response>;
  requestSoon(path: string, options?: FetchOptions): Promise<Response>;
}

export type PageLinks = {
  first?: string,
  prev?: string,
  next?: string,
  last?: string,
};

export type PageRel = keyof PageLinks;
