import { Hook } from './hook';
import { Terminal } from './terminal';

export class UpdateManager {
    public static DEFAULT_LENGTH = 0;
    public static EOL = '\n';

    private static instance: UpdateManager;
    private hooks: Hook[];
    private lastLength: number = UpdateManager.DEFAULT_LENGTH;
    private isActive: boolean = false;
    private terminal: Terminal = new Terminal();

    private constructor(stdin: NodeJS.ReadStream, stdout: NodeJS.WriteStream, stderr: NodeJS.WriteStream) {
        this.terminal = new Terminal(stdin, stdout);
        this.hooks = [stdout, stderr].map((stream): Hook => new Hook(stream));
    }

    public static getInstance(
        stdin: NodeJS.ReadStream = process.stdin,
        stdout: NodeJS.WriteStream = process.stdout,
        stderr: NodeJS.WriteStream = process.stderr
    ): UpdateManager {
        if (!UpdateManager.instance) {
            UpdateManager.instance = new UpdateManager(stdin, stdout, stderr);
        }

        return UpdateManager.instance;
    }

    public getTerminal(): Terminal {
        return this.terminal;
    }

    public async hook(): Promise<boolean> {
        if (!this.isActive) {
            await this.terminal.refresh();
            this.hooks.forEach((hook): void => hook.active());
            this.clear(true);
        }

        return this.isActive;
    }

    public unhook(): void {
        if (this.isActive) {
            this.hooks.forEach((hook): void => hook.inactive());
            this.clear();
        }
    }

    public update(text: string, position: number = 0): void {
        const [hook] = this.hooks;

        hook.clear(Math.abs(position - this.lastLength));
        hook.write(text + UpdateManager.EOL);
        this.lastLength = text.split(UpdateManager.EOL).length;
    }

    public isHooked(): boolean {
        return this.isActive;
    }

    private clear(status: boolean = false): void {
        this.isActive = status;
        this.lastLength = UpdateManager.DEFAULT_LENGTH;
    }
}
