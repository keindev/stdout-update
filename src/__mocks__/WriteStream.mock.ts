/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
export class WriteStream {
    public static ROWS = 12;
    public static COLUMNS = 80;

    public columns: number;
    public rows: number;

    public __stack: any[] = [];

    constructor(columns: number = WriteStream.COLUMNS, rows: number = WriteStream.ROWS) {
        this.columns = columns;
        this.rows = rows;
    }

    public write(str: string): boolean {
        if (typeof str === 'string') {
            this.__stack.push(...str.split('\n'));
        } else {
            this.__stack.push(str);
        }

        return true;
    }

    public clear(): void {
        this.__stack = [];
    }
}
