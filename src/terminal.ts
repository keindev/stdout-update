const CODE = '\x1b[6n'; // ansiEscapes.cursorGetPosition;
const { stdin, stdout } = process;

export class Terminal {
    public static COLUMNS = 80;
    public static ROWS = 24;

    private mode = false;
    private status = false;
    private x = 0;
    private y = 0;

    public static getWidth(): number {
        const { columns } = stdout;

        if (!columns) return Terminal.COLUMNS;
        if (process.platform === 'win32') return columns - 1;

        return columns;
    }

    public static getHeight(): number {
        const { rows } = stdout;

        if (!rows) return Terminal.ROWS;
        if (process.platform === 'win32') return rows - 1;

        return rows;
    }

    public getStatus(): boolean {
        return this.status;
    }

    public getCursorPosition(): { x: number; y: number } {
        return {
            x: this.x,
            y: this.y,
        };
    }

    public refresh(): Promise<boolean> {
        this.status = false;

        return new Promise((resolve): void => {
            stdin.resume();
            this.rawMode();

            stdin.once('data', (data): void => {
                const match = /\[(\d+);(\d+)R$/.exec(data.toString());

                if (match) {
                    this.status = true;
                    [this.y, this.x] = match.slice(1, 3).map(Number);
                }

                resolve();
            });

            stdout.write(CODE);
            stdout.emit('data', CODE);
        }).then(
            (): Promise<boolean> => {
                this.rawMode();
                stdin.pause();

                return Promise.resolve(this.getStatus());
            }
        );
    }

    private rawMode(): void {
        if (stdin.setRawMode) {
            this.mode = !this.mode;
            stdin.setRawMode(this.mode);
        }
    }
}
