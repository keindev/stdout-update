import ansiEscapes from 'ansi-escapes';
import { StringDecoder } from 'string_decoder';
import { Terminal } from './terminal';

export class Hook {
    static DRAIN = true;

    #stream: NodeJS.WriteStream;
    #decoder = new StringDecoder();
    #method: NodeJS.WriteStream['write'];
    #history: string[] = [];

    constructor(stream: NodeJS.WriteStream) {
        this.#method = stream.write;
        this.#stream = stream;
    }

    active(): void {
        this.write(ansiEscapes.cursorHide);
        this.#stream.write = (
            data: Uint8Array | string,
            ...args: [(string | undefined)?, ((err?: Error) => void)?] | [((err?: Error) => void)?]
        ): boolean => {
            const callback = args[args.length - 1];

            this.#history.push(
                this.#decoder.write(
                    typeof data === 'string'
                        ? Buffer.from(data, typeof args[0] === 'string' ? (args[0] as BufferEncoding) : undefined)
                        : Buffer.from(data)
                )
            );

            if (typeof callback === 'function') {
                callback();
            }

            return Hook.DRAIN;
        };
    }

    inactive(separateHistory = false): void {
        if (this.#history.length) {
            if (separateHistory) {
                this.write(Terminal.EOL);
            }

            this.#history.forEach(this.write, this);
            this.#history = [];
        }

        this.#stream.write = this.#method;
        this.write(ansiEscapes.cursorShow);
    }

    clear(lines: number): void {
        if (lines > 0) {
            this.write(ansiEscapes.eraseLines(lines + 1));
        }
    }

    write(msg: string): void {
        this.#method.apply(this.#stream, [msg]);
    }
}
