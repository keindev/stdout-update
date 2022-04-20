import ansiStyles from 'ansi-styles';
import stringWidth from 'string-width';
import stripAnsi from 'strip-ansi';

import { Terminal } from './Terminal.js';

const ESCAPES = new Set(['\u001B', '\u009B']);
const DEFAULT_COLOR_CODE = 39;
const INDENT = 4;

export class Wrapper {
  #rows: string[];

  constructor() {
    this.#rows = [''];
  }

  wrap(str: string, limit: number): string[] {
    if (!str.trim().length) return [''];

    this.#rows = [''];

    const rows = this.#rows;
    let rowLength: number;
    let wordLength: number;

    str
      .normalize()
      .split(' ')
      .forEach((word, index): void => {
        rowLength = stringWidth(rows[rows.length - 1] ?? '');
        wordLength = stringWidth(word);

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
          if (rowLength && wordLength && rowLength + wordLength > limit) rows.push('');

          rows[rows.length - 1] += word;
        }
      });

    return this.wrapEscapes(rows.map(value => value.trimRight()).join(Terminal.EOL)).split(Terminal.EOL);
  }

  private wrapEscapes(characters: string): string {
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

      if (escapeCode) {
        code = ansiStyles.codes.get(escapeCode);

        if (code) {
          if (characters[index + 1] === Terminal.EOL) result += wrap(code);
          if (character === Terminal.EOL) result += wrap(escapeCode);
        }
      }
    });

    return result;
  }

  private wrapWord(word: string, limit: number): void {
    const rows = this.#rows;
    let isInsideEscape = false;
    let visible = stringWidth(stripAnsi(rows[rows.length - 1] ?? ''));

    [...word].forEach((character, index, characters): void => {
      const characterLength = stringWidth(character);

      if (visible + characterLength <= limit) {
        rows[rows.length - 1] += character;
      } else {
        rows.push(character);
        visible = 0;
      }

      if (ESCAPES.has(character)) isInsideEscape = true;
      else if (isInsideEscape && character === 'm') isInsideEscape = false;
      else if (!isInsideEscape) {
        visible += characterLength;

        if (visible === limit && index < characters.length - 1) {
          rows.push('');
          visible = 0;
        }
      }
    });

    if (!visible && (rows[rows.length - 1] ?? '').length > 0 && rows.length > 1) rows[rows.length - 2] += rows.pop();
  }
}
