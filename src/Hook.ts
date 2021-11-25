import ansiEscapes from 'ansi-escapes';
import { StringDecoder } from 'string_decoder';

import { Terminal } from './Terminal';

export class Hook {
  static readonly DRAIN = true;

  #decoder = new StringDecoder();
  #history: string[] = [];
  #method: NodeJS.WriteStream['write'];
  #stream: NodeJS.WriteStream;

  constructor(stream: NodeJS.WriteStream) {
    this.#method = stream.write;
    this.#stream = stream;
  }

  active(): void {
    this.write(ansiEscapes.cursorHide);
    this.#stream.write = (
      data: Uint8Array | string,
      ...args: [(string | undefined)?, ((err?: Error) => void)?] | [((err?: Error) => void)?]
    ) => {
      const callback = args[args.length - 1];

      this.#history.push(
        this.#decoder.write(
          typeof data === 'string'
            ? Buffer.from(data, typeof args[0] === 'string' ? (args[0] as BufferEncoding) : undefined)
            : Buffer.from(data)
        )
      );

      if (typeof callback === 'function') callback();

      return Hook.DRAIN;
    };
  }

  erase(count: number): void {
    if (count > 0) this.write(ansiEscapes.eraseLines(count + 1));
  }

  inactive(separateHistory = false): void {
    if (this.#history.length) {
      if (separateHistory) this.write(Terminal.EOL);

      this.#history.forEach(this.write, this);
      this.#history = [];
    }

    this.#stream.write = this.#method;
    this.write(ansiEscapes.cursorShow);
  }

  write(msg: string): void {
    this.#method.apply(this.#stream, [msg]);
  }
}
