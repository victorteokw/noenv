const assignEnv = require('./lib/assignEnv');
const parseConfig = require('./lib/parseConfig');
const loadFile = require('load-any-file');
const resolveEntryConfFile = require('./lib/resolveEntryConfFile');
const locateConfDir = require('./lib/locateConfDir');
const locateProjRootDir = require('./lib/locateProjRootDir');

module.exports =
  assignEnv(
    parseConfig(
      loadFile(
        resolveEntryConfFile(
          locateConfDir(
            locateProjRootDir(
              // This value is cached, however, noenv is loaded only once
              module.parent.filename || process.cwd()
            )
          )
        )
      )
    )
  );
