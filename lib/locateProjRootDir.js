const findDominantFile = require('find-dominant-file');
const ConfigurationLoadError = require('./ConfigurationLoadError');

module.exports = function(requirer) {
  const projectRootDirectory = findDominantFile(
    requirer,
    [
      'package.json',
      '.git'
    ],
    true
  );
  if (projectRootDirectory) return projectRootDirectory;
  throw new ConfigurationLoadError('Cannot locate project root directory.');
};
