import tty from 'tty';
import ansiEscapes from 'ansi-escapes';

export class Terminal {
    public static COLUMNS = 80;
    public static ROWS = 24;

    private status = false;
    private stdin: NodeJS.ReadStream;
    private stdout: NodeJS.WriteStream;
    private x = 0;
    private y = 0;

    public constructor(stdin?: NodeJS.ReadStream, stdout?: NodeJS.WriteStream) {
        this.stdin = stdin || process.stdin;
        this.stdout = stdout || process.stdout;
    }

    public getWidth(): number {
        const {
            stdout: { columns },
        } = this;

        if (!columns) return Terminal.COLUMNS;
        if (process.platform === 'win32') return columns - 1;

        return columns;
    }

    public getHeight(): number {
        const {
            stdout: { rows },
        } = this;

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
        const { stdin, stdout } = this;
        this.status = false;

        return new Promise((resolve): void => {
            stdin.resume();
            this.rawMode(true);

            stdin.once('data', (data): void => {
                const match = /\[(\d+);(\d+)R$/.exec(data.toString());

                if (match) {
                    [this.y, this.x] = match.slice(1, 3).map(Number);
                    this.status = true;
                }

                resolve();
            });

            stdout.write(ansiEscapes.cursorGetPosition);
            stdout.emit('data', ansiEscapes.cursorGetPosition);
        }).then(
            (): Promise<boolean> => {
                this.rawMode(false);
                stdin.pause();

                return Promise.resolve(this.getStatus());
            }
        );
    }

    private rawMode(mode: boolean): void {
        const { stdin } = this;

        if (stdin.setRawMode) {
            stdin.setRawMode(mode);
        } else {
            // eslint-disable-next-line @typescript-eslint/no-angle-bracket-type-assertion
            (<any>tty).setRawMode(mode);
        }
    }
}
