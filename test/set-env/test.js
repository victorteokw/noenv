process.env.NODE_ENV = '';

test('sets question\'s value', () => {
  expect(require('./app.js')).toEqual({"env": "default", "question": "question"});
  expect(process.env.QUESTION).toEqual('question');
});
