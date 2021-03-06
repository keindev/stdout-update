export class WriteStream {
  static ROWS = 12;
  static COLUMNS = 80;

  columns: number;
  rows: number;

  _stack: any[] = [];

  constructor(columns: number = WriteStream.COLUMNS, rows: number = WriteStream.ROWS) {
    this.columns = columns;
    this.rows = rows;
  }

  write(str: string): boolean {
    return !!this._stack.push(...(typeof str === 'string' ? str.split('\n') : [str]));
  }

  clear(): void {
    this._stack = [];
  }
}
