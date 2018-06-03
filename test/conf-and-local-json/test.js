process.env.NODE_ENV = '';

test('automatically find \'local.json\' in \'conf\' dir', () => {
  expect(require('./app.js')).toEqual({"env": "local", "which": "local"});
});
