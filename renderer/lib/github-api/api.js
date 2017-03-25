const actualFetch = require('isomorphic-fetch');

export default class GitHubAPI {
  constructor(accessToken, {
    apiHost,
    fetch = actualFetch,
  } = {}) {
    this._token = accessToken;
    this._apiHost = apiHost;
    this._fetch = fetch;
  }

  async request(path, options = {}) {
    options.headers = Object.assign({}, options.headers, {
      Authorization: `token ${this._token}`,
    });
    try {
      const response = await this._fetch(`https://${this._apiHost}/${path}`, options);
      const json = await response.json();
      return { response, json };
    }
    catch (err) {
      return { err };
    }
  }
}
