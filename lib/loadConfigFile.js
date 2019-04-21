const path = require('path');
const fs = require('fs');
const ConfigurationLoadError = require('./ConfigurationLoadError');

const coffeeLoader = (filename) =>
  require('coffeescript').eval(fs.readFileSync(filename).toString());

const yamlLoader = (filename) =>
  require('js-yaml').load(fs.readFileSync(filename).toString());

const loaders = {
  json: require,
  js: require,
  ts: require,
  cson: coffeeLoader,
  coffee: coffeeLoader,
  yaml: yamlLoader
};

module.exports = function(filename) {
  const ext = path.extname(filename).substr(1);
  if (!loaders[ext]) {
    throw new ConfigurationLoadError(`Unhandled conf file extension '${ext}'.`);
  }
  return loaders[ext](filename);
};
