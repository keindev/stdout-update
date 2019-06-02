import { Hook } from './hook';

export class UpdateManager {
    public static DEFAULT_LENGTH = 0;
    public static EOL = '\n';

    private static instance: UpdateManager;
    private hooks: Hook[];
    private lastLength: number = UpdateManager.DEFAULT_LENGTH;
    private isActive: boolean = false;

    private constructor() {
        this.hooks = [process.stdout, process.stderr].map((stream): Hook => new Hook(stream));
    }

    public static getInstance(): UpdateManager {
        if (!UpdateManager.instance) {
            UpdateManager.instance = new UpdateManager();
        }

        return UpdateManager.instance;
    }

    public hook(): void {
        if (!this.isActive) {
            this.hooks.forEach((hook): void => hook.active());
            this.clean(true);
        }
    }

    public unhook(): void {
        if (this.isActive) {
            this.hooks.forEach((hook): void => hook.inactive());
            this.clean();
        }
    }

    public update(list: string[]): void {
        const [hook] = this.hooks;

        hook.clear(this.lastLength);
        hook.write(list.join(UpdateManager.EOL) + UpdateManager.EOL);
        this.lastLength = list.length;
    }

    private clean(status: boolean = false): void {
        this.isActive = status;
        this.lastLength = UpdateManager.DEFAULT_LENGTH;
    }
}
