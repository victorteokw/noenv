process.env.NODE_ENV = 'prod';

test('throws error when no file is found', () => {
  expect(() => require('./app.js')).toThrow(/Cannot find configuration file for env 'prod'/);
});
