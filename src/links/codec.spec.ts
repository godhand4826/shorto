import { encode, decode } from './codec';

describe('codec', () => {
  it('encode and decode should be bijective function', () => {
    const nums = [0, 1, 135, 1000000, 99999999];
    for (const n of nums) {
      expect(decode(encode(n))).toEqual(n);
    }
  });
});
