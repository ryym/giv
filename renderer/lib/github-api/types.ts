export type FetchOptions = {
  method?: string,
  headers?: {},
  body?: string,
};

export type APIResponse<J> = {
  readonly response?: Response,
  readonly json?: J,
  readonly err?: Error,
};

export interface GitHubAPI {
  request<T>(path: string, options?: FetchOptions): Promise<APIResponse<T>>;
  requestSoon<T>(path: string, options?: FetchOptions): Promise<APIResponse<T>>;
}
