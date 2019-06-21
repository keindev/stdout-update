import { Hook } from './hook';
import { Terminal } from './terminal';
import { Wrapper } from './wrapper';

export class UpdateManager {
    private static instance: UpdateManager;
    private hooks: Hook[];
    private wrapper: Wrapper;
    private terminal: Terminal;
    private lastLength: number = 0;
    private isActive: boolean = false;

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

    public unhook(): boolean {
        if (this.isActive) {
            this.hooks.forEach((hook): void => hook.inactive());
            this.clear();
        }

        return !this.isActive;
    }

    public update(rows: string[], position: number = 0): void {
        const { terminal, lastLength } = this;
        const [hook] = this.hooks;
        const height = terminal.getHeight();
        const width = terminal.getWidth();
        let output = rows.reduce<string[]>((acc, row): string[] => acc.concat(this.wrapper.wrap(row, width)), []);

        this.lastLength = position ? lastLength - position + output.length : output.length;

        if (height <= lastLength) {
            const outside = lastLength - height;

            // FIXME: if pos < outside ? slice out : calc clear height
            hook.clear(height);
            output.slice(outside + 1);
        } else {
            hook.clear(lastLength - position);
        }

        hook.write(output.join(Terminal.EOL) + Terminal.EOL);
    }

    public isHooked(): boolean {
        return this.isActive;
    }

    private clear(status: boolean = false): void {
        this.isActive = status;
        this.lastLength = 0;
    }
}
