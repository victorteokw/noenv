const path = require('path');

module.exports = function(confDir, filename) {
  return require(path.join(confDir, filename));
};
