const path = require('path');
const fs = require('fs');
const loadConfigFile = require('./loadConfigFile');
const ConfigurationLoadError = require('./ConfigurationLoadError');

const possibleConfFileExtensions = [
  'json',
  'js',
  'tson',
  'ts',
  'cson',
  'coffee',
  'yaml'
];

const possibleLocalFileNames = [
  'local',
  'default'
];

const possibleDevFileNames = [
  'dev',
  'development'
];

module.exports = function(confDir) {

  // Get all list of conf files
  const confFiles = fs.readdirSync(confDir);
  console.log(confFiles);

  // Load the conf file according to NODE_ENV if it's value is present
  if (process.env.NODE_ENV) {
    const env = process.env.NODE_ENV;
    const confFile = confFiles.find((f) => path.parse(f).name === env);
    if (!confFile) {
      throw new ConfigurationLoadError(
        `Cannot find configuration file for env '${env}'.`
      );
    }
    return loadConfigFile(confDir, confFile);
  }

  // Trying to load a local config file
  const localConfFile = confFiles.find(
    (f) => possibleLocalFileNames.includes(path.parse(f).name)
  );
  if (localConfFile) {
    process.env.NODE_ENV = path.parse(localConfFile).name;
    return loadConfigFile(confDir, localConfFile);
  }

  // Trying to load a dev config file
  const devConfFile = confFiles.find(
    (f) => possibleDevFileNames.includes(path.parse(f).name)
  );
  if (devConfFile) {
    process.env.NODE_ENV = path.parse(devConfFile).name;
    return loadConfigFile(confDir, devConfFile);
  }

  // Trying to load anyfile
  for (const ext of possibleConfFileExtensions) {
    const extFiles = confFiles.filter((f) => path.extname(f) === '.' + ext);
    for (const filename of extFiles) {
      process.env.NODE_ENV = path.parse(filename).name;
      return loadConfigFile(confDir, filename);
    }
  }

  throw new ConfigurationLoadError('Cannot find a configuration file.');
};
