process.env.NODE_ENV = '';

test('automatically find \'local.js\' in \'env\' dir', () => {
  expect(require('./app.js')).toEqual({ "env": "local", "which": "local" });
});
