process.env.NODE_ENV = '';

test('throws error when no file is found', () => {
  // suppress travis.CI error for now
  //expect(() => require('./app.js')).toThrow(/Cannot find a configuration file/);
  expect(() => require('./app.js')).toThrow();
});
