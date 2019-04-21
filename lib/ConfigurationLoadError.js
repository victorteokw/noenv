module.exports = class ConfigurationLoadError extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'ConfigurationLoadError';
  }
};
