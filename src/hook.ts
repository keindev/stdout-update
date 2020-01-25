import ansiEscapes from 'ansi-escapes';
import { StringDecoder } from 'string_decoder';
import { Terminal } from './terminal';

export type TWritableData = string | Buffer | Uint8Array;
export type TWritableEncoding = string | undefined;
export type TWritableCallback = ((err?: Error | undefined) => void) | undefined;
export type TWritableArgs = [TWritableEncoding?, TWritableCallback?] | [TWritableCallback?];

export interface ICursorPosition {
    row: number;
    col: number;
}

export interface IWritableFunction {
    (buffer: TWritableData, cb?: TWritableCallback): boolean;
    (str: string, encoding?: TWritableEncoding, cb?: TWritableCallback): boolean;
}

export class Hook {
    public static DRAIN = true;

    private stream: NodeJS.WriteStream;
    private decoder = new StringDecoder();
    private method: IWritableFunction;
    private history: string[] = [];

    public constructor(stream: NodeJS.WriteStream) {
        this.method = stream.write;
        this.stream = stream;
    }

    private static getBuffer(data: TWritableData, encoding: TWritableEncoding): Buffer {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof data === 'string') return Buffer.from(data, encoding as any);
        if (data instanceof Uint8Array) return Buffer.from(data);

        return data;
    }

    public active(): void {
        const { history, decoder } = this;

        this.write(ansiEscapes.cursorHide);
        this.stream.write = (data: TWritableData, ...args: TWritableArgs): boolean => {
            const callback = args[args.length - 1];

            history.push(decoder.write(Hook.getBuffer(data, typeof args[0] === 'string' ? args[0] : undefined)));

            if (typeof callback === 'function') {
                callback();
            }

            return Hook.DRAIN;
        };
    }

    public inactive(separateHistory = false): void {
        const { history } = this;

        if (history.length) {
            if (separateHistory) {
                this.write(Terminal.EOL);
            }

            history.forEach(this.write, this);
            this.history = [];
        }

        this.stream.write = this.method;
        this.write(ansiEscapes.cursorShow);
    }

    public clear(lines: number): void {
        if (lines > 0) {
            this.write(ansiEscapes.eraseLines(lines + 1));
        }
    }

    public write(msg: string): void {
        this.method.apply(this.stream, [msg]);
    }
}
