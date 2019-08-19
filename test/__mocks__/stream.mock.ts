/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { MockWritable } from './writable.mock';

export class MockWriteStream extends MockWritable implements NodeJS.WriteStream {
    public static ROWS = 12;
    public static COLUMNS = 80;
    public readonly readable: boolean = false;
    public readonly writable: boolean = true;
    public readonly writableFinished: boolean = false;

    public columns: number;
    public rows: number;

    public __stack: any[] = [];

    public constructor(columns: number = MockWriteStream.COLUMNS, rows: number = MockWriteStream.ROWS) {
        super();

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
