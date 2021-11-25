import { Hook } from './Hook';
import { Terminal } from './Terminal';
import { Wrapper } from './Wrapper';

export class UpdateManager {
  private static instance?: UpdateManager;
  #hooks: Hook[];
  #isActive = false;
  #lastLength = 0;
  #outside = 0;
  #terminal: Terminal;
  #wrapper: Wrapper;

  private constructor(stdout: NodeJS.WriteStream, stderr: NodeJS.WriteStream) {
    this.#hooks = [stdout, stderr].map((stream): Hook => new Hook(stream));
    this.#terminal = new Terminal(stdout);
    this.#wrapper = new Wrapper();
  }

  /**
   * Method to get the object to control the streams update
   * @param stdout - [process.stdout](https://nodejs.org/api/process.html#process_process_stdout)
   * @param stderr - [process.stderr](https://nodejs.org/api/process.html#process_a_note_on_process_i_o)
   */
  static getInstance(
    stdout: NodeJS.WriteStream = process.stdout,
    stderr: NodeJS.WriteStream = process.stderr
  ): UpdateManager {
    if (!UpdateManager.instance) UpdateManager.instance = new UpdateManager(stdout, stderr);

    return UpdateManager.instance;
  }

  /**
   * Last printed rows count
   */
  get lastLength(): number {
    return this.#lastLength;
  }

  /**
   * Rows count outside editable area
   */
  get outside(): number {
    return this.#outside;
  }

  /**
   * Hook activity status
   */
  get isHooked(): boolean {
    return this.#isActive;
  }

  /**
   * Removes from the bottom of output up the specified count of lines
   * @param count - lines count to remove
   */
  erase(count = this.#lastLength): void {
    const [hook] = this.#hooks;

    if (hook) hook.erase(count);
  }

  /**
   * Hook stdout and stderr streams
   * @returns Success status
   */
  hook(): boolean {
    if (!this.#isActive) {
      this.#hooks.forEach(hook => hook.active());
      this.clear(true);
    }

    return this.#isActive;
  }

  /**
   * Unhooks both stdout and stderr streams and print their story of logs
   * @param separateHistory - If `true`, will add an empty line to the history output for individual recorded lines and console logs
   * @returns Success status
   */
  unhook(separateHistory = true): boolean {
    if (this.#isActive) {
      this.#hooks.forEach(hook => hook.inactive(separateHistory));
      this.clear();
    }

    return !this.#isActive;
  }

  /**
   * Update output
   * @param rows - Text lines to write to standard output
   * @param from - Index of the line starting from which the contents of the terminal are being overwritten
   */
  update(rows: string[], from = 0): void {
    if (rows.length) {
      const [hook] = this.#hooks;

      if (hook) {
        const { width, height } = this.#terminal;
        const position = from > height ? height - 1 : Math.max(0, Math.min(height - 1, from));
        const actualLength = this.lastLength - position;
        const outside = Math.max(actualLength - height, this.outside);
        let output = rows.reduce<string[]>((acc, row) => acc.concat(this.#wrapper.wrap(row, width)), []);

        if (height <= actualLength) {
          hook.erase(height);

          if (position < outside) output = output.slice(outside - position + 1);
        } else if (actualLength) {
          hook.erase(actualLength);
        }

        hook.write(output.join(Terminal.EOL) + Terminal.EOL);
        this.#lastLength = outside ? outside + output.length + 1 : output.length;
        this.#outside = Math.max(this.lastLength - height, this.outside);
      }
    }
  }

  private clear(status = false): void {
    this.#isActive = status;
    this.#lastLength = 0;
    this.#outside = 0;
  }
}

export default UpdateManager;
