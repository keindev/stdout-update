import stringWidth from 'string-width';
import stripAnsi from 'strip-ansi';
import ansiStyles from 'ansi-styles';
import { Terminal } from './terminal';

export class Wrapper {
    public static EMPTY = '';
    public static SPACE = ' ';
    public static END_CODE = 39;
    public static ESCAPES = new Set(['\u001B', '\u009B']);

    private rows: string[];

    public constructor() {
        this.rows = [Wrapper.EMPTY];
    }

    private static wrapEscapes(characters: string): string {
        const slice = (index: number): RegExpExecArray | null => /\d[^m]*/.exec(characters.slice(index, index + 4));
        const wrap = (code: number): string => `${Wrapper.ESCAPES.values().next().value}[${code}m`;
        let result = Wrapper.EMPTY;
        let match: RegExpExecArray | null;
        let code: number | undefined;
        let escapeCode: number | null;

        [...characters].forEach((character, index): void => {
            result += character;

            if (Wrapper.ESCAPES.has(character)) {
                match = slice(index);

                if (match) {
                    code = parseFloat(match[0]);
                    escapeCode = code === Wrapper.END_CODE ? null : code;
                }
            }

            code = ansiStyles.codes.get(Number(escapeCode));

            if (escapeCode && code) {
                if (characters[index + 1] === Terminal.EOL) {
                    result += wrap(code);
                } else if (character === Terminal.EOL) {
                    result += wrap(escapeCode);
                }
            }
        });

        return result;
    }

    private static trimRight(str: string): string {
        const words = str.split(Wrapper.SPACE);
        let last = words.length;

        while (last > 0 && stringWidth(words[last - 1]) <= 0) last--;

        return last === words.length
            ? str
            : words.slice(0, last).join(Wrapper.SPACE) + words.slice(last).join(Wrapper.EMPTY);
    }

    public wrap(str: string, limit: number): string[] {
        if (str.trim() === Wrapper.EMPTY) return [Wrapper.EMPTY];

        this.rows = [Wrapper.EMPTY];

        const { rows } = this;
        const words = str.normalize().split(Wrapper.SPACE);
        const lengths = words.map((character): number => stringWidth(character));
        let rowLength: number;
        let wordLength: number;

        words.forEach((word, index): void => {
            rowLength = stringWidth(rows[rows.length - 1]);
            wordLength = lengths[index];

            if (index !== 0) {
                rows[rows.length - 1] += Wrapper.SPACE;
                rowLength++;
            }

            if (wordLength > limit) {
                const remainingColumns = limit - rowLength;
                const breaksStartingThisLine = 1 + Math.floor((wordLength - remainingColumns - 1) / limit);
                const breaksStartingNextLine = Math.floor((wordLength - 1) / limit);

                if (breaksStartingNextLine < breaksStartingThisLine) rows.push(Wrapper.EMPTY);

                this.wrapWord(word, limit);
            } else {
                if (rowLength + wordLength > limit && rowLength && wordLength) rows.push(Wrapper.EMPTY);

                rows[rows.length - 1] += word;
            }
        });

        return Wrapper.wrapEscapes(rows.map(Wrapper.trimRight).join(Terminal.EOL)).split(Terminal.EOL);
    }

    private wrapWord(word: string, limit: number): void {
        const { rows } = this;
        const characters = [...word];
        let isInsideEscape = false;
        let visible = stringWidth(stripAnsi(rows[rows.length - 1]));
        const lineBreak = (l: number, i: number): void => {
            visible += l;

            if (visible === limit && i < characters.length - 1) {
                rows.push(Wrapper.EMPTY);
                visible = 0;
            }
        };

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
                lineBreak(characterLength, index);
            }
        });

        if (!visible && rows[rows.length - 1].length > 0 && rows.length > 1) {
            rows[rows.length - 2] += rows.pop();
        }
    }
}
