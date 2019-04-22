const assignEnv = require('./lib/assignEnv');
const parseConfig = require('./lib/parseConfig');
const loadConfigFile = require('./lib/loadConfigFile');
const resolveEntryConfFile = require('./lib/resolveEntryConfFile');
const locateConfDir = require('./lib/locateConfDir');
const locateProjRootDir = require('./lib/locateProjRootDir');

module.exports =
  assignEnv(
    parseConfig(
      loadConfigFile(
        resolveEntryConfFile(
          locateConfDir(
            locateProjRootDir(
              module.parent.filename || process.cwd()
            )
          )
        )
      )
    )
  );
