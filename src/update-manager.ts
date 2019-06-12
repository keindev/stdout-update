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

    private constructor() {
        this.hooks = [process.stdout, process.stderr].map((stream): Hook => new Hook(stream));
    }

    public static getInstance(): UpdateManager {
        if (!UpdateManager.instance) {
            UpdateManager.instance = new UpdateManager();
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
