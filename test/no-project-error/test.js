process.env.NODE_ENV = '';

test('throws if cannot find project root', () => {
  expect(() => require('./app.js')).toThrow();
});
