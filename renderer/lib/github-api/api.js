import actualFetch from 'isomorphic-fetch';
import runWithLimit from '../async/run-with-limit';

/**
 * NOTE: Actually GitHub doesn't allow any concurrent requests as abuse rate limit.
 * But it seems that small number of concurrent requests don't hit the limit soon.
 * (https://developer.github.com/guides/best-practices-for-integrators)
 */
const MAX_CONCURRENT_REQUESTS_COUNT = 5;

export default class GitHubAPI {
  constructor(accessToken, {
    apiHost,
    fetch = actualFetch,
    withLimit = runWithLimit,
  } = {}) {
    this._token = accessToken;
    this._apiHost = apiHost;
    const limit = withLimit(MAX_CONCURRENT_REQUESTS_COUNT);
    this._fetchGently = (url, options) => limit(() => fetch(url, options));
  }

  async request(rawPath, options = {}) {
    const url = this.normalizeURL(rawPath);
    if (url == null) {
      throw new Error(`Invalid path: ${rawPath}`);
    }

    options.headers = Object.assign({}, options.headers, {
      Authorization: `token ${this._token}`,
    });
    try {
      const response = await this._fetchGently(url, options);
      const json = await response.json();
      return { response, json };
    }
    catch (err) {
      return { err };
    }
  }

  normalizeURL(path) {
    if (! path.startsWith('http')) {
      return `https://${this._apiHost}/${path}`;
    }
    if (path.indexOf(`://${this._apiHost}`) >= 0) {
      return path;
    }
    return null;
  }
}
