const loadConfig = require('./lib/loadConfig');
const parseConfig = require('./lib/parseConfig');
const requirer = require.main.filename;

module.exports = Object.assign(
  {},
  parseConfig(loadConfig(requirer)),
  {env: process.env.NODE_ENV}
);
