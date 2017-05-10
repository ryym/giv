import runWithLimit from '../async/run-with-limit';
import { GitHubAPI, APIResponse, FetchOptions } from './types';

type Fetch = typeof window.fetch;

export type ClientOptions = {
  apiRoot: string,
  fetch?: Fetch,
  withLimit?: (n: number) => <T>(process: () => Promise<T>) => Promise<T>,
};

/**
 * NOTE: Actually GitHub doesn't allow any concurrent requests as abuse rate limit.
 * But it seems that small number of concurrent requests don't hit the limit soon.
 * (https://developer.github.com/guides/best-practices-for-integrators)
 */
const MAX_CONCURRENT_REQUESTS_COUNT = 5;

export default class GitHubAPIBase implements GitHubAPI {
  private readonly _token: string;
  private readonly _apiRoot: string;
  private readonly _fetch: Fetch;
  private readonly _fetchGently: Fetch;

  constructor(accessToken: string, {
    apiRoot,
    fetch = window.fetch,
    withLimit = runWithLimit,
  }: ClientOptions) {
    this._token = accessToken;
    this._apiRoot = apiRoot;
    this._fetch = fetch;

    const limit = withLimit(MAX_CONCURRENT_REQUESTS_COUNT);
    this._fetchGently = (url, options) => limit(() => fetch(url, options));
  }

  async request<T>(rawPath: string, options?: FetchOptions): Promise<APIResponse<T>> {
    return this._request<T>(this._fetchGently, rawPath, options);
  }

  async requestSoon<T>(rawPath: string, options?: FetchOptions): Promise<APIResponse<T>> {
    return this._request<T>(this._fetch, rawPath, options);
  }

  async _request<T>(fetch: Fetch, rawPath: string, options: FetchOptions = {}): Promise<APIResponse<T>> {
    const url = this.normalizeURL(rawPath);
    if (url == null) {
      throw new Error(`Invalid path: ${rawPath}`);
    }

    options.headers = Object.assign({}, options.headers, {
      Authorization: `token ${this._token}`,
    });
    try {
      const response = await this._fetchGently(url, options);
      const json = (await response.json()) as T;
      return { response, json };
    }
    catch (err) {
      return { err };
    }
  }

  normalizeURL(path: string): string | null {
    if (! path.startsWith('http')) {
      return `${this._apiRoot}/${path}`;
    }
    if (path.indexOf(this._apiRoot) >= 0) {
      return path;
    }
    return null;
  }
}
