/* eslint-disable no-undef */
import { assert } from 'chai';

describe('Basic mocha string test', () => {
  it('should return number of characters in a string', () => {
    assert.equal('hello'.length, 5);
  });

  it('should return first character of the string', () => {
    assert.equal('hello'.charAt(0), 'h');
  });
});
