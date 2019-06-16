import stringWidth from 'string-width';
import stripAnsi from 'strip-ansi';
import ansiStyles from 'ansi-styles';

export class Terminal {
    public static COLUMNS = 80;
    public static ROWS = 24;
    public static END_CODE = 39;
    public static EOL = '\n';
    public static ESCAPES = new Set(['\u001B', '\u009B']);

    private stdout: NodeJS.WriteStream;

    public constructor(stdout: NodeJS.WriteStream) {
        this.stdout = stdout;
    }

    public static wrap(str: string, columns: number): string {
        const text = String(str).normalize();
        let result = '';

        if (text.trim().length) {
            const words = text.split(' ');
            const lengths = words.map((character): number => stringWidth(character));

            let pre = '';
            let rows = [''];
            let rowLength: number;

            words.forEach((word, index): void => {
                rowLength = stringWidth(rows[rows.length - 1]);

                if (index > 0) {
                    if (rowLength >= columns) {
                        rows.push('');
                        rowLength = 0;
                    }

                    if (rowLength > 0) {
                        rows[rows.length - 1] += ' ';
                        rowLength++;
                    }
                }

                if (lengths[index] > columns) {
                    const remainingColumns = columns - rowLength;
                    const breaksStartingThisLine = 1 + Math.floor((lengths[index] - remainingColumns - 1) / columns);
                    const breaksStartingNextLine = Math.floor((lengths[index] - 1) / columns);

                    if (breaksStartingNextLine < breaksStartingThisLine) {
                        rows.push('');
                    }

                    Terminal.wrapWord(rows, word, columns);
                } else if (rowLength + lengths[index] > columns && rowLength > 0 && lengths[index] > 0) {
                    if (rowLength < columns) {
                        Terminal.wrapWord(rows, word, columns);
                    } else {
                        rows.push('');
                    }
                } else if (rowLength + lengths[index] > columns) {
                    Terminal.wrapWord(rows, word, columns);
                } else {
                    rows[rows.length - 1] += word;
                }
            });

            result = Terminal.wrapEscapes(rows.join(Terminal.EOL));
        }

        return result;
    }

    public static wrapAnsi(code: number): string {
        return `${Terminal.ESCAPES.values().next().value}[${code}m`;
    }

    public static wrapEscapes(characters: string): string {
        const slice = (index: number): RegExpExecArray | null => /\d[^m]*/.exec(characters.slice(index, index + 4));
        let result = '';
        let match: RegExpExecArray | null;
        let code: number | undefined;
        let escapeCode: number | undefined;

        [...characters].forEach((character, index): void => {
            result += character;

            if (Terminal.ESCAPES.has(character)) {
                match = slice(index);

                if (match) {
                    code = parseFloat(match[0]);
                    escapeCode = code === Terminal.END_CODE ? undefined : code;
                }
            }

            if (escapeCode) {
                code = ansiStyles.codes.get(escapeCode);

                if (code) {
                    result +=
                        characters[index + 1] === Terminal.EOL
                            ? Terminal.wrapAnsi(code)
                            : Terminal.wrapAnsi(escapeCode);
                }
            }
        });

        return result;
    }

    public static wrapWord(rows: string[], word: string, columns: number): void {
        const characters = [...word];
        let isInsideEscape = false;
        let visible = stringWidth(stripAnsi(rows[rows.length - 1]));

        characters.forEach((character, index): void => {
            const characterLength = stringWidth(character);

            if (visible + characterLength <= columns) {
                rows[rows.length - 1] += character;
            } else {
                rows.push(character);
                visible = 0;
            }

            if (Terminal.ESCAPES.has(character)) {
                isInsideEscape = true;
            } else if (isInsideEscape && character === 'm') {
                isInsideEscape = false;
            } else if (!isInsideEscape) {
                visible += characterLength;

                if (visible === columns && index < characters.length - 1) {
                    rows.push('');
                    visible = 0;
                }
            }
        });

        if (!visible && rows[rows.length - 1].length > 0 && rows.length > 1) {
            rows[rows.length - 2] += rows.pop();
        }
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
