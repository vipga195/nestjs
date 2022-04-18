export interface HeaderData {
  query: object;
  body: object;
}

export const getQuery = (params: HeaderData) => {
  return params.query;
};

export const getBody = (params: HeaderData) => {
  return params.body;
};
