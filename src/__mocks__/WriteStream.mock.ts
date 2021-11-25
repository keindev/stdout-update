export class WriteStream {
  static COLUMNS = 80;
  static ROWS = 12;

  _stack: any[] = [];

  columns: number;
  rows: number;

  constructor(columns: number = WriteStream.COLUMNS, rows: number = WriteStream.ROWS) {
    this.columns = columns;
    this.rows = rows;
  }

  clear(): void {
    this._stack = [];
  }

  write(str: string): boolean {
    return !!this._stack.push(...(typeof str === 'string' ? str.split('\n') : [str]));
  }
}
