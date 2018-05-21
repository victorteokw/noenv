const path = require('path');
const fs = require('fs');

const requirer = require.main.filename;

const findDominantFile = function(dir, filename) {
  while (dir !== '/') {
    const maybe = path.join(dir, filename);
    if (fs.existsSync(maybe)) return maybe;
    dir = path.dirname(dir);
  }
}

const projectRoot = path.dirname(findDominantFile(path.dirname(requirer), 'package.json'));

const confDir = ['conf', 'config', 'configs', 'configuration', 'configurations', 'env', 'envs', 'environment', 'environments'].map((d) => path.join(projectRoot, d)).find(fs.existsSync);

let conf;

if (process.env.NODE_ENV) {
  const env = process.env.NODE_ENV;
  const confFile = ['json', 'js', 'ts', 'cson', 'coffee', 'es6']
    .map((ext) => `${env}.${ext}`)
    .map((f) => path.join(confDir, f))
    .find(fs.existsSync);
  if (confFile) {
    conf = require(confFile);
  } else {
    throw `Cannot find configuration file for env '${env}'.`;
  }
} else {
  const localFile = ['local.js', 'local.json'].map((f) => path.join(confDir, f)).find(fs.existsSync);
  if (localFile) {
    process.env.NODE_ENV = 'local';
    conf = require(localFile);
  } else {
    const devFile = ['dev.json', 'dev.js', 'development.json', 'development.js'].map((f) => path.join(confDir, f)).find(fs.existsSync);
    if (devFile) {
      process.env.NODE_ENV = path.parse(devFile).name;
      conf = require(devFile);
    } else {
      let anyfile = fs.readdirSync(confDir)[0];
      if (anyfile) {
        anyfile = path.join(confDir, anyfile);
        process.env.NODE_ENV = path.parse(anyfile).name;
        conf = require(anyfile);
      } else {
        throw 'Cannot find a configuration file';
      }
    }
  }
}

module.exports = Object.assign({}, conf, {env: process.env.NODE_ENV});
