const path = require('path');
const loadFile = require('load-any-file');
const ConfigurationLoadError = require('./ConfigurationLoadError');

module.exports = function(confDir, pureFilename) {
  try {
    return loadFile.resolve(path.join(confDir, pureFilename));
  } catch(e) {
    throw new ConfigurationLoadError(
      `Cannot find configuration file '${pureFilename}'.`
    );
  }
};
