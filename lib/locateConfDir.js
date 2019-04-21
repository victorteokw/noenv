const path = require('path');
const fs = require('fs');
const ConfigurationLoadError = require('./ConfigurationLoadError');

const possibleConfDirNames = [
  'conf',
  'config',
  'configs',
  'configuration',
  'configurations',
  'env',
  'envs',
  'environment',
  'environments',
  'setting',
  'settings'
];

module.exports = function(projectRoot) {
  // Find configuration directory first
  const confDir = possibleConfDirNames
    .map((d) => path.join(projectRoot, d))
    .find(fs.existsSync);
  if (!confDir) {
    throw new ConfigurationLoadError(`Cannot find configuration path for '${
      projectRoot
    }'.`);
  }
  return confDir;
};
