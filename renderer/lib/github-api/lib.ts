export const paramsToQuery = (params: { [key: string]: any }) => {
  const query = Object.keys(params).reduce((q, k) => {
    const v = params[k];
    return v != null ? `${q}&${k}=${v}` : `${q}&${k}`;
  }, '');
  return query.length > 0 ? `?${query}` : query;
};
