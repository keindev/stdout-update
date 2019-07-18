export class Terminal {
    public static COLUMNS = 80;
    public static ROWS = 24;
    public static EOL = '\n';

    private stdout: NodeJS.WriteStream;
    private isWin32: boolean = process.platform === 'win32';

    public constructor(stdout: NodeJS.WriteStream) {
        this.stdout = stdout;
    }

    public getWidth(): number {
        const {
            stdout: { columns },
        } = this;

        return columns ? this.adapt(columns) : Terminal.COLUMNS;
    }

    public getHeight(): number {
        const {
            stdout: { rows },
        } = this;

        return rows ? this.adapt(rows) : Terminal.ROWS;
    }

    private adapt(value: number): number {
        return this.isWin32 ? value - 1 : value;
    }
}
