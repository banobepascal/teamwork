/* eslint-disable no-undef */
const assert = require('assert');

describe('Basic mocha string test', () => {
  it('should return number of characters in a string', () => {
    assert.equal('hello'.length, 4);
  });

  it('should return first character of the string', () => {
    assert.equal('hello'.charAt(0), 'h');
  });
});
