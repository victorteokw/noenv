function parse(config) {
  if (Array.isArray(config)) {
    return config.map((c) => parse(c));
  }
  if (typeof config === 'object') {
    return Object.assign(
      ...Object.entries(config).map(([k, v]) => ({ [k]: parse(v) }))
    );
  }
  if ((typeof config === 'string') && config.trim().match(/^process\.env/)) {
    config = config.trim();
    let matchData;
    if (matchData = config.match(/^process\.env$/)) {
      return process.env;
    } else if (matchData = config.match(/^process\.env\.([\w]+)(!?)$/)) {
      if (matchData[2] && (process.env[matchData[1]] === undefined)) {
        throw `process.env.${matchData[1]} shouldn't be undefined`;
      }
      return process.env[matchData[1]];
    } else if (matchData =
        config.match(/^process\.env\.([\w]+) *\|\|(=?) *(.*)$/)) {
      if (process.env[matchData[1]] === undefined) {
        if (matchData[2]) {
          process.env[matchData[1]] = eval(matchData[3]);
          return process.env[matchData[1]];
        } else {
          return eval(matchData[3]);
        }
      } else {
        return process.env[matchData[1]];
      }
    }
    throw `Illegal dynamic config string '${config}'`;
  }
  return config;
}

module.exports = parse;
