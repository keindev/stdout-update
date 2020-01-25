import { MockWriteStream } from '../__mocks__/stream.mock';
import { Terminal } from '../terminal';

const stdout: MockWriteStream = new MockWriteStream();
const terminal: Terminal = new Terminal(stdout);

describe('Terminal', (): void => {
    it('Size', (): void => {
        expect(stdout).toBeInstanceOf(MockWriteStream);
        expect(terminal).toBeInstanceOf(Terminal);

        if (process.platform === 'win32') {
            expect(terminal.getWidth()).toBe(MockWriteStream.COLUMNS - 1);
            expect(terminal.getHeight()).toBe(MockWriteStream.ROWS - 1);
        } else {
            expect(terminal.getWidth()).toBe(MockWriteStream.COLUMNS);
            expect(terminal.getHeight()).toBe(MockWriteStream.ROWS);
        }
    });
});
