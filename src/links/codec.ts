const base62 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function encode(num: number): string {
  const digits = [];
  while (num > 0) {
    const rem = num % base62.length;
    digits.push(base62[rem]);
    num = (num - rem) / base62.length;
  }
  return digits.reverse().join('');
}

function decode(str: string): number {
  let num = 0;
  for (const c of str) {
    num = num * 62 + base62.indexOf(c);
  }
  return num;
}

export { encode, decode };
