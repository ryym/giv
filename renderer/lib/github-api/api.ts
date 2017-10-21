import runWithLimit from '../async/run-with-limit';
import { GitHubAPI, FetchOptions } from './types';

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
  private readonly token: string;
  private readonly apiRoot: string;
  private readonly fetch: Fetch;
  private readonly fetchGently: Fetch;

  constructor(accessToken: string, {
    apiRoot,
    fetch = window.fetch,
    withLimit = runWithLimit,
  }: ClientOptions) {
    this.token = accessToken;
    this.apiRoot = apiRoot;
    this.fetch = fetch;

    const limit = withLimit(MAX_CONCURRENT_REQUESTS_COUNT);
    this.fetchGently = (url, options) => limit(() => fetch(url, options));
  }

  async request(rawPath: string, options?: FetchOptions): Promise<Response> {
    return this.doRequest(this.fetchGently, rawPath, options);
  }

  async requestSoon(rawPath: string, options?: FetchOptions): Promise<Response> {
    return this.doRequest(this.fetch, rawPath, options);
  }

  private async doRequest(
      fetch: Fetch,
      rawPath: string,
      options: FetchOptions = {},
  ): Promise<Response> {
    const url = this.normalizeURL(rawPath);
    if (url == null) {
      throw new Error(`Invalid path: ${rawPath}`);
    }

    options.headers = Object.assign({}, options.headers, {
      Authorization: `token ${this.token}`,
    });
    return this.fetchGently(url, options);
  }

  normalizeURL(path: string): string | null {
    if (! path.startsWith('http')) {
      return `${this.apiRoot}/${path}`;
    }
    if (path.indexOf(this.apiRoot) >= 0) {
      return path;
    }
    return null;
  }
}
