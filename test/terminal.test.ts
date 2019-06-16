import ansiEscapes from 'ansi-escapes';
import { Terminal } from '../src/terminal';
import { WriteStream, ReadStream } from './mocks/stream.mock';

let stdin: ReadStream;
let stdout: WriteStream;
let terminal: Terminal;
const ROWS = 12;
const COLUMNS = 80;

describe('Terminal', (): void => {
    beforeEach((): void => {
        stdin = new ReadStream();
        stdout = new WriteStream(COLUMNS, ROWS);
        terminal = new Terminal(stdin, stdout);
    });

    it('Init', (): void => {
        expect(stdin).toBeInstanceOf(ReadStream);
        expect(stdout).toBeInstanceOf(WriteStream);
        expect(terminal).toBeInstanceOf(Terminal);
        expect(terminal.getStatus()).toBeFalsy();
        expect(stdin.isRaw).toBeFalsy();
    });

    it('Refresh', (done): void => {
        stdout.emit = jest.fn((event: string | symbol, ...args: any[]): boolean => {
            expect(args[0]).toBe(ansiEscapes.cursorGetPosition);

            // eslint-disable-next-line no-underscore-dangle
            return stdin.emit(event, stdout.__stack.pop());
        });

        terminal.refresh().then((): void => {
            const position = terminal.getStartCursorPosition();

            expect(position).toBeTruthy();
            expect(position.col).toBe(0);
            expect(position.row).toBe(12);
            expect(terminal.getWidth()).toBe(COLUMNS);
            expect(terminal.getHeight()).toBe(ROWS);

            done();
        });
    });
});
