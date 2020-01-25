import stripAnsi from 'strip-ansi';
import { Wrapper } from '../wrapper';
import { Terminal } from '../terminal';

let wrapper: Wrapper;

const red = (s: string): string => `\u001B[31m${s}\u001b[39m`;
const wrap = (s: string, l: number): string => wrapper.wrap(s, l).join(Terminal.EOL);
const mapWrap = (a: string[], l: number): string => a.map((s): string => wrap(s, l)).join(Terminal.EOL);
const FIXTURE = `The quick brown ${red('fox jumped over ')}the lazy ${red('dog and then ran away with the quokka.')}`;

describe('Wrapper', (): void => {
    beforeEach((): void => {
        wrapper = new Wrapper();
    });

    it('Breaks strings longer than "cols" characters', (): void => {
        const long = wrapper.wrap(FIXTURE, 20);

        expect(long).toMatchSnapshot();
        expect(long.every((line): boolean => stripAnsi(line).length <= 20)).toBeTruthy();

        const short = wrapper.wrap(FIXTURE, 5);

        expect(short).toMatchSnapshot();
        expect(short.every((line): boolean => stripAnsi(line).length <= 5)).toBeTruthy();
    });

    it('Word-wrapping and no trimming', (): void => {
        expect(mapWrap(['12345678', '901234567890 12345'], 13)).toBe('12345678\n901234567890\n12345');
        expect(mapWrap(['12345678', '901234567890'], 10)).toBe('12345678\n9012345678\n90');
        expect(wrap('12345678', 5)).toBe('12345\n678');
        expect(wrap('12345678 ', 5)).toBe('12345\n678');
        expect(wrap('   ', 2)).toBe('');
        expect(wrap('foo bar', 3)).toBe('foo\nbar');
        expect(wrap('안녕하세', 4)).toBe('안녕\n하세');
    });

    it('Removes last row if it contained only ansi escape codes', (): void => {
        expect(
            stripAnsi(wrap(red('absolution'), 2))
                .split('\n')
                .every((line): boolean => line.length === 2)
        ).toBeTruthy();
    });

    it('Does not prepend newline if first word is split', (): void => {
        const result = wrapper.wrap(`${red('hello')}world`, 5);

        expect(result.length).toBe(2);
    });

    it('Supports unicode surrogate pairs', (): void => {
        expect(wrap('a\uD83C\uDE00bc', 2)).toBe('a\n\uD83C\uDE00\nbc');
        expect(wrap('a\uD83C\uDE00bc\uD83C\uDE00d\uD83C\uDE00', 2)).toBe(
            'a\n\uD83C\uDE00\nbc\n\uD83C\uDE00\nd\n\uD83C\uDE00'
        );
    });
});
