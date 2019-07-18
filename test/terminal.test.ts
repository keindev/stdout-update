import { Terminal } from '../src/terminal';
import { MockWriteStream } from './__mocks__/stream.mock';

const stdout: MockWriteStream = new MockWriteStream();
const terminal: Terminal = new Terminal(stdout);

describe('Terminal', (): void => {
    it('Size', (): void => {
        expect(stdout).toBeInstanceOf(MockWriteStream);
        expect(terminal).toBeInstanceOf(Terminal);

        expect(terminal.getWidth()).toBe(MockWriteStream.COLUMNS);
        expect(terminal.getHeight()).toBe(MockWriteStream.ROWS);
    });
});
