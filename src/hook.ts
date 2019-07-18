import ansiEscapes from 'ansi-escapes';
import { StringDecoder } from 'string_decoder';
import * as Types from './types';

export class Hook {
    public static DRAIN = true;

    private stream: NodeJS.WriteStream;
    private decoder = new StringDecoder();
    private method: Types.WritableFunction;
    private story: string[] = [];

    public constructor(stream: NodeJS.WriteStream) {
        this.method = stream.write;
        this.stream = stream;
    }

    private static getBuffer(data: Types.WritableData, encoding: Types.WritableEncoding): Buffer {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof data === 'string') return Buffer.from(data, encoding as any);
        if (data instanceof Uint8Array) return Buffer.from(data);

        return data;
    }

    public active(): void {
        const { story, decoder } = this;

        this.write(ansiEscapes.cursorHide);
        this.stream.write = (data: Types.WritableData, ...args: Types.WritableArgs): boolean => {
            const callback = args[args.length - 1];

            story.push(decoder.write(Hook.getBuffer(data, typeof args[0] === 'string' ? args[0] : undefined)));

            if (typeof callback === 'function') {
                callback();
            }

            return Hook.DRAIN;
        };
    }

    public inactive(): void {
        const { story } = this;

        if (story.length) {
            story.forEach(this.write, this);
            this.story = [];
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
