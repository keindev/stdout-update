import stringWidth from 'string-width';
import stripAnsi from 'strip-ansi';
import ansiStyles from 'ansi-styles';
import { Terminal } from './terminal';

export class Wrapper {
    public static EMPTY = '';
    public static SPACE = ' ';
    public static END_CODE = 39;
    public static ESCAPES = new Set(['\u001B', '\u009B']);

    private limit: number;
    private rows: string[];

    public constructor(limit: number) {
        this.limit = limit;
        this.rows = [Wrapper.EMPTY];
    }

    private static wrapEscapes(characters: string): string {
        const slice = (index: number): RegExpExecArray | null => /\d[^m]*/.exec(characters.slice(index, index + 4));
        const wrap = (code: number): string => `${Wrapper.ESCAPES.values().next().value}[${code}m`;
        let result = Wrapper.EMPTY;
        let match: RegExpExecArray | null;
        let code: number | undefined;
        let escapeCode: number | undefined;

        [...characters].forEach((character, index): void => {
            result += character;

            if (Wrapper.ESCAPES.has(character)) {
                match = slice(index);

                if (match) {
                    code = parseFloat(match[0]);
                    escapeCode = code === Wrapper.END_CODE ? undefined : code;
                }
            }

            if (escapeCode) {
                code = ansiStyles.codes.get(escapeCode);

                if (code) {
                    result += wrap(characters[index + 1] === Terminal.EOL ? code : escapeCode);
                }
            }
        });

        return result;
    }

    public wrap(str: string, limit: number = this.limit): string[] {
        const text = String(str).normalize();
        let result: string[] = [];

        if (text.trim().length) {
            this.rows = [Wrapper.EMPTY];

            const { rows } = this;
            const words = text.split(Wrapper.SPACE);
            const lengths = words.map((character): number => stringWidth(character));
            let rowLength: number;
            let wordLength: number;
            let remainingColumns: number;
            let breaksStartingThisLine: number;
            let breaksStartingNextLine: number;

            words.forEach((word, index): void => {
                rowLength = stringWidth(rows[rows.length - 1]);
                wordLength = lengths[index];

                if (index > 0) {
                    if (rowLength >= limit) {
                        rows.push(Wrapper.EMPTY);
                        rowLength = 0;
                    }

                    if (rowLength > 0) {
                        rows[rows.length - 1] += Wrapper.SPACE;
                        rowLength++;
                    }
                }

                if (wordLength > limit) {
                    remainingColumns = limit - rowLength;
                    breaksStartingThisLine = 1 + Math.floor((wordLength - remainingColumns - 1) / limit);
                    breaksStartingNextLine = Math.floor((wordLength - 1) / limit);

                    if (breaksStartingNextLine < breaksStartingThisLine) {
                        rows.push(Wrapper.EMPTY);
                    }

                    this.wrapWord(word);
                } else if (rowLength + wordLength > limit) {
                    if (rowLength && wordLength) {
                        if (rowLength < limit) {
                            this.wrapWord(word);
                        } else {
                            rows.push(Wrapper.EMPTY);
                        }
                    } else {
                        this.wrapWord(word);
                    }
                } else {
                    rows[rows.length - 1] += word;
                }
            });

            result = rows.map((row): string => Wrapper.wrapEscapes(row));
        }

        return result;
    }

    private wrapWord(word: string, limit: number = this.limit): void {
        const { rows } = this;
        const characters = [...word];
        let isInsideEscape = false;
        let visible = stringWidth(stripAnsi(rows[rows.length - 1]));

        characters.forEach((character, index): void => {
            const characterLength = stringWidth(character);

            if (visible + characterLength <= limit) {
                rows[rows.length - 1] += character;
            } else {
                rows.push(character);
                visible = 0;
            }

            if (Wrapper.ESCAPES.has(character)) {
                isInsideEscape = true;
            } else if (isInsideEscape && character === 'm') {
                isInsideEscape = false;
            } else if (!isInsideEscape) {
                visible += characterLength;

                if (visible === limit && index < characters.length - 1) {
                    rows.push(Wrapper.EMPTY);
                    visible = 0;
                }
            }
        });

        if (!visible && rows[rows.length - 1].length > 0 && rows.length > 1) {
            rows[rows.length - 2] += rows.pop();
        }
    }
}
