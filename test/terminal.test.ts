import { Terminal } from '../src/terminal';
import { WriteStream } from './__mocks__/stream.mock';

const ROWS = 12;
const COLUMNS = 80;

let stdout: WriteStream;
let terminal: Terminal;

describe('Terminal', (): void => {
    beforeEach((): void => {
        stdout = new WriteStream(COLUMNS, ROWS);
        terminal = new Terminal(stdout);
    });

    it('Size', (): void => {
        expect(stdout).toBeInstanceOf(WriteStream);
        expect(terminal).toBeInstanceOf(Terminal);

        expect(terminal.getWidth()).toBe(COLUMNS);
        expect(terminal.getHeight()).toBe(ROWS);
    });
});
