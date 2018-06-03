process.env.NODE_ENV = '';

test('throws error when no file is found', () => {
  expect(() => require('./app.js')).toThrow(/Cannot find a configuration file/);
});
