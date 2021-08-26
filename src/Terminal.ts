export class Terminal {
  static readonly COLUMNS = 80;
  static readonly ROWS = 24;
  static readonly EOL = '\n';

  #stdout: NodeJS.WriteStream;
  #isWin32 = process.platform === 'win32';

  constructor(stdout: NodeJS.WriteStream) {
    this.#stdout = stdout;
  }

  get width(): number {
    return this.#stdout.columns ? this.adapt(this.#stdout.columns) : Terminal.COLUMNS;
  }

  get height(): number {
    return this.#stdout.rows ? this.adapt(this.#stdout.rows) : Terminal.ROWS;
  }

  adapt(value: number): number {
    return this.#isWin32 ? value - 1 : value;
  }
}
