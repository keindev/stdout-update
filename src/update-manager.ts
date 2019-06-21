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
        const outside = Math.max(lastLength - height, this.outside);
        let output = rows.reduce<string[]>((acc, row): string[] => acc.concat(this.wrapper.wrap(row, width)), []);

        if (height <= lastLength) {
            hook.clear(height);

            if (position < outside) {
                output = output.slice(outside - position);
            }
        } else if (lastLength - position > 0) {
            hook.clear(lastLength - position);
        }

        hook.write(output.join(Terminal.EOL) + Terminal.EOL);
        this.lastLength = outside ? outside + output.length + 1 : output.length + 1;
        this.outside = Math.max(this.lastLength - height, this.outside);
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

    private clear(status: boolean = false): void {
        this.isActive = status;
        this.lastLength = 0;
        this.outside = 0;
    }
}
