export class Terminal {
    public static COLUMNS = 80;
    public static ROWS = 24;
    public static EOL = '\n';

    private stdout: NodeJS.WriteStream;

    public constructor(stdout: NodeJS.WriteStream) {
        this.stdout = stdout;
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
}
