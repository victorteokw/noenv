process.env.NODE_ENV = '';

test('automatically find \'dev.json\' in \'env\' dir', () => {
  expect(require('./app.js')).toEqual({ "env": "dev", "which": "dev" });
});
