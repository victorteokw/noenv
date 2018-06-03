process.env.NODE_ENV = 'prod';

test('automatically find \'prod.json\' in \'conf\' dir', () => {
  expect(require('./app.js')).toEqual({ "env": "prod", "which": "prod" });
});
