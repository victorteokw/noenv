process.env.NODE_ENV = '';

test('automatically find \'default.json\' in \'config\' dir', () => {
  expect(require('./app.js')).toEqual({"env": "default", "which": "default"});
});
