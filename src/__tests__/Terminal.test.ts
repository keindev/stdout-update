import tty from 'tty';

// eslint-disable-next-line jest/no-mocks-import
import { WriteStream } from '../__mocks__/WriteStream.mock';
import { Terminal } from '../Terminal';

const stdout = (new WriteStream() as unknown) as WriteStream & tty.WriteStream;
const terminal = new Terminal(stdout);

describe('Terminal', (): void => {
  it('Size', (): void => {
    const isWin = process.platform === 'win32';

    expect(stdout).toBeInstanceOf(WriteStream);
    expect(terminal).toBeInstanceOf(Terminal);
    expect(terminal.getWidth()).toBe(isWin ? WriteStream.COLUMNS - 1 : WriteStream.COLUMNS);
    expect(terminal.getHeight()).toBe(isWin ? WriteStream.ROWS - 1 : WriteStream.ROWS);
  });
});
