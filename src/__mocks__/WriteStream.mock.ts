/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import tty from 'tty';

export class WriteStream extends tty.WriteStream {
    public static ROWS = 12;
    public static COLUMNS = 80;

    public columns: number;
    public rows: number;

    public __stack: any[] = [];

    constructor(columns: number = WriteStream.COLUMNS, rows: number = WriteStream.ROWS) {
        super(1);

        this.columns = columns;
        this.rows = rows;
    }

    public write(str: any, encoding?: any, cb?: any): boolean {
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
