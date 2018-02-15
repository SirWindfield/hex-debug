import hex from '../hex';

const content12 = Buffer.from('Thisissomebs');
const content16 = Buffer.from('Thisissomerandom');

describe('Options', () => {
  it('prints a table with default options', () => {
    const expected = '000000  54 68 69 73 69 73 73 6F 6D 65 72 61 6E 64 6F 6D  Thisissomerandom';
    const received = hex(content16, undefined, undefined, true);
    expect(received).toEqual(expected);
  });

  it('prints with custom columns', () => {
    const expected = '000000  54 68 69 73 69 73 73 6F 6D 65 62 73  Thisissomebs';
    const received = hex(content12, 12, undefined, true);
    expect(received).toEqual(expected);
  });

  it('prints without the map', () => {
    const expected = '000000  54 68 69 73 69 73 73 6F 6D 65 72 61 6E 64 6F 6D ';
    const received = hex(content16, undefined, false, true);
    expect(received).toEqual(expected);
  });
});
