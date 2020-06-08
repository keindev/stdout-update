import { Hook } from './hook';
import { Terminal } from './terminal';
import { Wrapper } from './wrapper';

export class UpdateManager {
    private static instance?: UpdateManager;
    #hooks: Hook[];
    #wrapper: Wrapper;
    #terminal: Terminal;
    #lastLength = 0;
    #outside = 0;
    #isActive = false;

    private constructor(stdout: NodeJS.WriteStream, stderr: NodeJS.WriteStream) {
        this.#hooks = [stdout, stderr].map((stream): Hook => new Hook(stream));
        this.#terminal = new Terminal(stdout);
        this.#wrapper = new Wrapper();
    }

    static getInstance(
        stdout: NodeJS.WriteStream = process.stdout,
        stderr: NodeJS.WriteStream = process.stderr
    ): UpdateManager {
        if (!UpdateManager.instance) {
            UpdateManager.instance = new UpdateManager(stdout, stderr);
        }

        return UpdateManager.instance;
    }

    get lastLength(): number {
        return this.#lastLength;
    }

    get outside(): number {
        return this.#outside;
    }

    get isHooked(): boolean {
        return this.#isActive;
    }

    hook(): boolean {
        if (!this.#isActive) {
            this.#hooks.forEach((hook) => hook.active());
            this.clear(true);
        }

        return this.#isActive;
    }

    unhook(separateHistory = true): boolean {
        if (this.#isActive) {
            this.#hooks.forEach((hook) => hook.inactive(separateHistory));
            this.clear();
        }

        return !this.#isActive;
    }

    update(rows: string[], from = 0): void {
        if (rows.length) {
            const [hook] = this.#hooks;
            const height = this.#terminal.getHeight();
            const width = this.#terminal.getWidth();
            const position = from > height ? height - 1 : Math.max(0, Math.min(height - 1, from));
            const actualLength = this.lastLength - position;
            const outside = Math.max(actualLength - height, this.outside);
            let output = rows.reduce<string[]>((acc, row) => acc.concat(this.#wrapper.wrap(row, width)), []);

            if (height <= actualLength) {
                hook.clear(height);

                if (position < outside) {
                    output = output.slice(outside - position + 1);
                }
            } else if (actualLength) {
                hook.clear(actualLength);
            }

            hook.write(output.join(Terminal.EOL) + Terminal.EOL);
            this.#lastLength = outside ? outside + output.length + 1 : output.length;
            this.#outside = Math.max(this.lastLength - height, this.outside);
        }
    }

    private clear(status = false): void {
        this.#isActive = status;
        this.#lastLength = 0;
        this.#outside = 0;
    }
}
