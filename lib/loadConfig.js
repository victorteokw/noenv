const path = require('path');
const fs = require('fs');
const findDominantFile = require('./findDominantFile');

const possibleConfDirNames = [
  'conf',
  'config',
  'configs',
  'configuration',
  'configurations',
  'env',
  'envs',
  'environment',
  'environments'
];

const possibleConfFileExtensions = [
  'json',
  'js',
  'ts',
  'cson',
  'coffee',
  'es6'
];

const possibleLocalFileNames = [
  'local'
];

const possibleDevFileNames = [
  'dev',
  'development'
];

module.exports = function(requirer) {
  const projectRoot = findDominantFile(requirer, 'package.json', true);
  const confDir = possibleConfDirNames
    .map((d) => path.join(projectRoot, d))
    .find(fs.existsSync);
  let env = process.env.NODE_ENV;
  if (env) {
    const confFile = possibleConfFileExtensions
      .map((ext) => path.join(confDir, `${env}.${ext}`))
      .find(fs.existsSync);
    if (confFile) return require(confFile);
    throw `Cannot find configuration file for env '${env}'.`;
  }
  let localFile, localFileName;
  possibleLocalFileNames.map((l) => {
    possibleConfFileExtensions.map((ext) => {
      const maybe = path.join(confDir, `${l}.${ext}`);
      fs.existsSync(maybe) && (localFile = maybe) && (localFileName = l);
    });
  });
  if (localFile) {
    process.env.NODE_ENV = localFileName;
    return require(localFile);
  }
  let devFile, devFileName;
  possibleDevFileNames.map((d) => {
    possibleConfFileExtensions.map((ext) => {
      const maybe = path.join(confDir, `${d}.${ext}`);
      fs.existsSync(maybe) && (devFile = maybe) && (devFileName = l);
    });
  });
  if (devFile) {
    process.env.NODE_ENV = devFileName;
    return require(devFile);
  }
  let anyfile = fs.readdirSync(confDir)[0];
  if (anyfile) {
    anyfile = path.join(confDir, anyfile);
    process.env.NODE_ENV = path.parse(anyfile).name;
    return require(anyfile);
  }
  throw 'Cannot find a configuration file';
};
