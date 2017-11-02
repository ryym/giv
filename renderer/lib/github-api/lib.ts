import { PageLinks, PageRel } from './types';

export const paramsToQuery = (params: { [key: string]: any }) => {
  const query = Object.keys(params).reduce((q, k) => {
    const v = params[k];
    return v != null ? `${q}&${k}=${v}` : `${q}&${k}`;
  }, '');
  return query.length > 0 ? `?${query}` : query;
};

// GitHub provides pagination URLs as a string such as:
// <https://api.github.com/notifications?page=3>; rel="next", <https://api.github.com/notifications?page=7>; rel="last"
export const extractLinks = (link: string): PageLinks => {
  const links: PageLinks = {};
  link.split(',').forEach((part: string) => {
    const m = part.match(/<([^>]+)>;\s+rel="(first|prev|next|last)"/);
    if (m != null) {
      const url = m[1];
      const rel = m[2] as PageRel;
      links[rel] = url;
    }
  });
  return links;
};

export const extractPage = (url: string): number | null => {
  const m = url.match(/(?:\?|&)page=(\d+)/);
  return m == null ? null : Number(m[1]);
};
