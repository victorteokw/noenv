process.env.NODE_ENV = '';
process.env.HOST = '127.0.0.1';

test('parses dynamic config items', () => {
  expect(require('./app.js')).toEqual({
    "env": "default",
    "path": "127.0.0.1",
    "port": 4200,
    "other": [5600, "127.0.0.1"]
  });
});
