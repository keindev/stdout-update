/* eslint-disable jest/no-mocks-import */
import tty from 'tty';
import { WriteStream } from '../__mocks__/WriteStream.mock';
import { Terminal } from '../terminal';

const stdout = (new WriteStream() as unknown) as WriteStream & tty.WriteStream;
const terminal = new Terminal(stdout);

describe('Terminal', (): void => {
    it('Size', (): void => {
        expect(stdout).toBeInstanceOf(WriteStream);
        expect(terminal).toBeInstanceOf(Terminal);

        if (process.platform === 'win32') {
            expect(terminal.getWidth()).toBe(WriteStream.COLUMNS - 1);
            expect(terminal.getHeight()).toBe(WriteStream.ROWS - 1);
        } else {
            expect(terminal.getWidth()).toBe(WriteStream.COLUMNS);
            expect(terminal.getHeight()).toBe(WriteStream.ROWS);
        }
    });
});
