export const ENDPOINTS = Object.freeze({
  photo: {
    search: (params: string) => `?tags=${params}`,
  },
});
