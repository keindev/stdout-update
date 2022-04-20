import tty from 'tty';

import { Terminal } from '../Terminal.js';
// eslint-disable-next-line jest/no-mocks-import
import { WriteStream } from './__mocks__/WriteStream.mock.js';

const stdout = new WriteStream() as unknown as WriteStream & tty.WriteStream;
const terminal = new Terminal(stdout);

describe('Terminal', (): void => {
  it('Size', (): void => {
    const isWin = process.platform === 'win32';

    expect(stdout).toBeInstanceOf(WriteStream);
    expect(terminal).toBeInstanceOf(Terminal);
    expect(terminal.width).toBe(isWin ? WriteStream.COLUMNS - 1 : WriteStream.COLUMNS);
    expect(terminal.height).toBe(isWin ? WriteStream.ROWS - 1 : WriteStream.ROWS);
  });
});
