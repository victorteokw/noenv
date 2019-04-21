const path = require('path');
const fs = require('fs');
const ConfigurationLoadError = require('./ConfigurationLoadError');
const possibleConfFileExtensions = require('./possibleConfFileExtensions');

module.exports = function(confDir, pureFilename) {
  // Load the file according to confFile
  for (const ext of possibleConfFileExtensions) {
    const confFile = path.join(confDir, pureFilename + '.' + ext);
    if (fs.existsSync(confFile)) return confFile;
  }
  throw new ConfigurationLoadError(
    `Cannot find configuration file '${pureFilename}'.`
  );
};
