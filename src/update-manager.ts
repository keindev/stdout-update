import { Hook } from './hook';
import { Terminal } from './terminal';
import { Wrapper } from './wrapper';

export class UpdateManager {
    private static instance: UpdateManager;
    private hooks: Hook[];
    private wrapper: Wrapper;
    private terminal: Terminal;
    private lastLength = 0;
    private outside = 0;
    private isActive = false;

    private constructor(stdout: NodeJS.WriteStream, stderr: NodeJS.WriteStream) {
        this.hooks = [stdout, stderr].map((stream): Hook => new Hook(stream));
        this.terminal = new Terminal(stdout);
        this.wrapper = new Wrapper();
    }

    public static getInstance(
        stdout: NodeJS.WriteStream = process.stdout,
        stderr: NodeJS.WriteStream = process.stderr
    ): UpdateManager {
        if (!UpdateManager.instance) {
            UpdateManager.instance = new UpdateManager(stdout, stderr);
        }

        return UpdateManager.instance;
    }

    public hook(): boolean {
        if (!this.isActive) {
            this.hooks.forEach((hook): void => hook.active());
            this.clear(true);
        }

        return this.isActive;
    }

    public unhook(separateHistory = true): boolean {
        if (this.isActive) {
            this.hooks.forEach((hook): void => hook.inactive(separateHistory));
            this.clear();
        }

        return !this.isActive;
    }

    public update(rows: string[], from = 0): void {
        if (rows.length) {
            const { terminal } = this;
            const [hook] = this.hooks;
            const height = terminal.getHeight();
            const width = terminal.getWidth();
            const position = from > height ? height - 1 : Math.max(0, Math.min(height - 1, from));
            const actualLength = this.lastLength - position;
            const outside = Math.max(actualLength - height, this.outside);
            let output = rows.reduce<string[]>((acc, row): string[] => acc.concat(this.wrapper.wrap(row, width)), []);

            if (height <= actualLength) {
                hook.clear(height);

                if (position < outside) {
                    output = output.slice(outside - position + 1);
                }
            } else if (actualLength) {
                hook.clear(actualLength);
            }

            hook.write(output.join(Terminal.EOL) + Terminal.EOL);
            this.lastLength = outside ? outside + output.length + 1 : output.length;
            this.outside = Math.max(this.lastLength - height, this.outside);
        }
    }

    public getLastLength(): number {
        return this.lastLength;
    }

    public getOutside(): number {
        return this.outside;
    }

    public isHooked(): boolean {
        return this.isActive;
    }

    private clear(status = false): void {
        this.isActive = status;
        this.lastLength = 0;
        this.outside = 0;
    }
}
