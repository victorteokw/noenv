const loadConfig = require('./lib/loadConfig');
const parseConfig = require('./lib/parseConfig');
const locateProjRootDir = require('./lib/locateProjRootDir');
const locateConfDir = require('./lib/locateConfDir');

module.exports = Object.assign(
  {},
  parseConfig(
    loadConfig(
      locateConfDir(
        locateProjRootDir(
          module.parent.filename || process.cwd()
        )
      )
    )
  ),
  { env: process.env.NODE_ENV }
);
