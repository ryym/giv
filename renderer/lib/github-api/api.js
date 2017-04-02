import actualFetch from 'isomorphic-fetch';
import runWithLimit from '../async/run-with-limit';

export default class GitHubAPI {
  constructor(accessToken, {
    apiHost,
    fetch = actualFetch,
  } = {}) {
    this._token = accessToken;
    this._apiHost = apiHost;
    this._fetch = fetch;
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
      const response = await this._fetch(url, options);
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
