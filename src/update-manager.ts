import wrapAnsi from 'wrap-ansi';
import { Hook } from './hook';
import { Terminal } from './terminal';

export class UpdateManager {
    private static instance: UpdateManager;
    private hooks: Hook[];
    private terminal: Terminal;
    private lastLength: number = 0;
    private isActive: boolean = false;

    private constructor(stdout: NodeJS.WriteStream, stderr: NodeJS.WriteStream) {
        this.hooks = [stdout, stderr].map((stream): Hook => new Hook(stream));
        this.terminal = new Terminal(stdout);
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

        return this.isActive;
    }

    public update(rows: string[], position: number = 0): void {
        const [hook] = this.hooks;
        let out = rows.join(Terminal.EOL) + Terminal.EOL;

        out = wrapAnsi(out, this.terminal.getWidth(), {

        });

        hook.clear(Math.abs(position - this.lastLength));
        hook.write(out);
        this.lastLength = out.split(Terminal.EOL).length;
    }

    public isHooked(): boolean {
        return this.isActive;
    }

    private clear(status: boolean = false): void {
        this.isActive = status;
        this.lastLength = 0;
    }
}
