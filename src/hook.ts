import ansiEscapes from 'ansi-escapes';
import * as Types from './types';

export class Hook {
    public static DRAIN = true;

    private stream: NodeJS.WriteStream;
    private method: Types.WritableFunction;
    private story: string[] = [];

    public constructor(stream: NodeJS.WriteStream) {
        this.method = stream.write;
        this.stream = stream;
    }

    public active(): void {
        this.write(ansiEscapes.cursorHide);
        this.stream.write = (buffer: Types.WritableData, ...args: Types.WritableArgs): boolean => {
            const { story } = this;
            const callback = args[args.length - 1];
            const encoding = typeof args[0] === 'string' ? args[0] : undefined;

            if (typeof callback === 'function') callback();

            if (typeof buffer === 'string') story.push(new TextDecoder().decode(Buffer.from(buffer, encoding as any)));
            else if (Buffer.isBuffer(buffer)) story.push(buffer.toString());
            else if (buffer instanceof Uint8Array) story.push(new TextDecoder().decode(buffer));

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
        this.write(ansiEscapes.eraseLines(lines + 1));
    }

    public write(msg: string): void {
        this.method.apply(this.stream, [msg]);
    }
}
