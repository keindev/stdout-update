import readline from 'readline';
import { WritableFunction, WritableData, WritableArgs, WritableCallback, WritableEncoding } from './types';

export class Hook {
    public static DRAIN = true;

    private stream: NodeJS.WriteStream;
    private method: WritableFunction;
    private story: Map<string, [WritableEncoding, WritableCallback]> = new Map();

    public constructor(stream: NodeJS.WriteStream) {
        this.method = stream.write;
        this.stream = stream;
    }

    public active(): void {
        this.stream.write = (buffer: WritableData, ...args: WritableArgs): boolean => {
            // FIXME: write clear sequence
            // call readline.XYZ calls this.stream.write hook! it's problem.
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

    public clear(lines: number): void {
        if (this.stream.isTTY) {
            // TODO: use moveCursorTo instead global moving with cursorTo
            readline.cursorTo(this.stream, 0, 0);
            readline.clearScreenDown(this.stream);
            readline.cursorTo(this.stream, 0, 0);
        }
    }

    public write(str: string, encoding?: WritableEncoding, callback?: WritableCallback): void {
        this.method.apply(this.stream, [str, encoding, callback]);
    }

    public inactive(): void {
        this.stream.write = this.method;

        this.story.forEach(
            (args, buffer): void => {
                this.write(buffer, ...args);
            }
        );

        this.story.clear();
    }
}
