import ansiStyles from 'ansi-styles';
import stringWidth from 'string-width';
import stripAnsi from 'strip-ansi';

import { Terminal } from './Terminal';

const ESCAPES = new Set(['\u001B', '\u009B']);
const DEFAULT_COLOR_CODE = 39;
const INDENT = 4;

const wrapEscapes = (characters: string): string => {
  const slice = (index: number): RegExpExecArray | null => /\d[^m]*/.exec(characters.slice(index, index + INDENT));
  const wrap = (code: number): string => `${ESCAPES.values().next().value}[${code}m`;
  let result = '';
  let match: RegExpExecArray | null;
  let code: number | undefined;
  let escapeCode: number | undefined;

  [...characters].forEach((character, index): void => {
    result += character;

    if (ESCAPES.has(character)) {
      match = slice(index);

      if (match && match[0]) {
        code = parseFloat(match[0]);
        escapeCode = code === DEFAULT_COLOR_CODE ? undefined : code;
      }
    }

    code = ansiStyles.codes.get(Number(escapeCode));

    if (escapeCode && code) {
      if (characters[index + 1] === Terminal.EOL) result += wrap(code);
      if (character === Terminal.EOL) result += wrap(escapeCode);
    }
  });

  return result;
};

const trimRight = (str: string): string => {
  const words = str.split(' ');
  let last = words.length;

  while (last > 0 && stringWidth(words[last - 1] ?? '') <= 0) last--;

  return last === words.length ? str : words.slice(0, last).join(' ') + words.slice(last).join('');
};

export class Wrapper {
  #rows: string[];

  public constructor() {
    this.#rows = [''];
  }

  public wrap(str: string, limit: number): string[] {
    if (!str.trim().length) return [''];

    this.#rows = [''];

    const rows = this.#rows;
    const words = str.normalize().split(' ');
    const lengths = words.map((character): number => stringWidth(character));
    let rowLength: number;
    let wordLength: number;

    words.forEach((word, index): void => {
      rowLength = stringWidth(rows[rows.length - 1] ?? '');
      wordLength = lengths[index] ?? 0;

      if (index !== 0) {
        rows[rows.length - 1] += ' ';
        rowLength++;
      }

      if (wordLength > limit) {
        const remainingColumns = limit - rowLength;
        const breaksStartingThisLine = 1 + Math.floor((wordLength - remainingColumns - 1) / limit);
        const breaksStartingNextLine = Math.floor((wordLength - 1) / limit);

        if (breaksStartingNextLine < breaksStartingThisLine) rows.push('');

        this.wrapWord(word, limit);
      } else {
        if (rowLength + wordLength > limit && rowLength && wordLength) rows.push('');

        rows[rows.length - 1] += word;
      }
    });

    return wrapEscapes(rows.map(trimRight).join(Terminal.EOL)).split(Terminal.EOL);
  }

  private wrapWord(word: string, limit: number): void {
    const rows = this.#rows;
    const characters = [...word];
    let isInsideEscape = false;
    let visible = stringWidth(stripAnsi(rows[rows.length - 1] ?? ''));
    const lineBreak = (l: number, i: number): void => {
      visible += l;

      if (visible === limit && i < characters.length - 1) {
        rows.push('');
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

      if (ESCAPES.has(character)) isInsideEscape = true;
      else if (isInsideEscape && character === 'm') isInsideEscape = false;
      else if (!isInsideEscape) lineBreak(characterLength, index);
    });

    if (!visible && (rows[rows.length - 1] ?? '').length > 0 && rows.length > 1) rows[rows.length - 2] += rows.pop();
  }
}
