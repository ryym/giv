export type FetchOptions = {
  method?: string,
  headers?: {},
};

export interface GitHubAPI {
  request(path: string, options?: FetchOptions): Promise<Response>;
  requestSoon(path: string, options?: FetchOptions): Promise<Response>;
}
