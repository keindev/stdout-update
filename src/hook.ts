import ansiEscapes from 'ansi-escapes';
import * as Types from './types';

export class Hook {
    public static DRAIN = true;

    private stream: NodeJS.WriteStream;
    private method: Types.WritableFunction;
    private story: Map<string, [Types.WritableEncoding, Types.WritableCallback]> = new Map();

    public constructor(stream: NodeJS.WriteStream) {
        this.method = stream.write;
        this.stream = stream;
    }

    public active(): void {
        this.write(ansiEscapes.cursorHide);
        this.stream.write = (buffer: Types.WritableData, ...args: Types.WritableArgs): boolean => {
            const last = args[args.length - 1];
            const callback = typeof last === 'function' ? last : undefined;
            const encoding = typeof args[0] === 'string' ? args[0] : undefined;
            let value = '';

            if (typeof buffer === 'string') value = buffer;
            else if (Buffer.isBuffer(buffer)) value = buffer.toString(encoding);
            else if (Array.isArray(buffer)) value = new TextDecoder().decode(buffer);

            this.story.set(value, [encoding, callback]);

            return Hook.DRAIN;
        };
    }

    public inactive(): void {
        const { story } = this;

        if (story.size) {
            story.forEach(
                (args, buffer): void => {
                    this.write(buffer, ...args);
                }
            );

            story.clear();
        }

        this.stream.write = this.method;
        this.write(ansiEscapes.cursorShow);
    }

    public clear(lines: number): void {
        this.write(ansiEscapes.eraseLines(lines + 1));
    }

    public write(str: string, encoding?: Types.WritableEncoding, callback?: Types.WritableCallback): void {
        this.method.apply(this.stream, [str, encoding, callback]);
    }
}
