const getError = (err) =>
  err.response && err.response.data && err.response
    ? err.response
    : err.message;

export { getError };
