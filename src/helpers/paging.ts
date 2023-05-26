const getPagination = (page: number, size: number) => {
  page = page - 1;
  const limit = size ? size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

export { getPagination };
