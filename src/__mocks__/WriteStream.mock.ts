/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
export class WriteStream {
  public static ROWS = 12;
  public static COLUMNS = 80;

  public columns: number;
  public rows: number;

  public _stack: any[] = [];

  constructor(columns: number = WriteStream.COLUMNS, rows: number = WriteStream.ROWS) {
    this.columns = columns;
    this.rows = rows;
  }

  public write(str: string): boolean {
    if (typeof str === 'string') {
      this._stack.push(...str.split('\n'));
    } else {
      this._stack.push(str);
    }

    return true;
  }

  public clear(): void {
    this._stack = [];
  }
}
