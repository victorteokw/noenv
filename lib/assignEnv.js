module.exports = (config) =>
  Object.assign({}, config, { env: process.env.NODE_ENV });
