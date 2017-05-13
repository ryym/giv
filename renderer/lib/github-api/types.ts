export type FetchOptions = {
  headers?: {},
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
