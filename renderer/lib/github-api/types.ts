export type FetchOptions = {
  headers?: {},
};

export type APIResponse<J extends Object> = {
  response?: Response,
  json?: J,
  err?: Error,
};

export interface GitHubAPI {
  request<T>(path: string, options?: FetchOptions): Promise<APIResponse<T>>;
  requestSoon<T>(path: string, options?: FetchOptions): Promise<APIResponse<T>>;
}
