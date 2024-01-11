import {isEmpty} from './utils.ts';

describe('UTILS', () => {
  it('should be empty', () => {
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty('            ')).toBeTruthy();
    expect(isEmpty(undefined)).toBeTruthy();
    expect(isEmpty(null)).toBeTruthy();
  });
  it('should be not empty', () => {
    expect(isEmpty('a')).toBeFalsy();
  });
});
