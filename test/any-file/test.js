process.env.NODE_ENV = '';

test('automatically find \'2conf.json\' in \'conf\' dir', () => {
  expect(require('./app.js')).toEqual({"env": "2conf", "key": "var"});
});
