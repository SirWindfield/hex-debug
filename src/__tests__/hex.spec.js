import chalk from 'chalk';
import hex from '../hex';

const content12 = Buffer.from('Thisissomebs');
const content16 = Buffer.from('Thisissomerandom');

describe('Options', () => {
  it('returns an empty string if the buffer is null', () => {
    expect(hex(undefined)).toEqual('');
  });

  it('returns an empty string if the buffer is empty', () => {
    expect(hex(Buffer.from(''))).toEqual('');
  });

  it('returns a table with default options', () => {
    const expected = '000000  54 68 69 73 69 73 73 6F 6D 65 72 61 6E 64 6F 6D  Thisissomerandom';
    const config = { color: false };
    const received = hex(content16, config);
    expect(received).toEqual(expected);
  });

  it('returns a table with custom columns', () => {
    const expected = '000000  54 68 69 73 69 73 73 6F 6D 65 62 73  Thisissomebs';
    const config = { columns: 12, color: false };
    const received = hex(content12, config);
    expect(received).toEqual(expected);
  });

  it('returns a table without the map', () => {
    const expected = '000000  54 68 69 73 69 73 73 6F 6D 65 72 61 6E 64 6F 6D ';
    const config = { map: false, color: false };
    const received = hex(content16, config);
    expect(received).toEqual(expected);
  });

  it('returns a table with colored output', () => {
    const expected = `${chalk.dim('000000')}  54 68 69 73 69 73 73 6F 6D 65 72 61 6E 64 6F 6D `;
    const config = { color: true, map: false };
    const received = hex(content16, config);
    expect(received).toEqual(expected);
  });
});
