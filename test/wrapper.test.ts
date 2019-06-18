import stripAnsi from 'strip-ansi';
import { Wrapper } from '../src/wrapper';
import { Terminal } from '../src/terminal';

let wrapper: Wrapper;

const red = (s: string): string => `\u001B[31m${s}\u001b[39m`;
const wrap = (s: string, l: number): string => wrapper.wrap(s, l).join(Terminal.EOL);
const mapWrap = (a: string[], l: number): string => a.map((s): string => wrap(s, l)).join(Terminal.EOL);
const FIXTURE = `The quick brown ${red('fox jumped over ')} the lazy ${red('dog and then ran away with the quokka.')}`;

describe('Wrapper', (): void => {
    beforeEach((): void => {
        wrapper = new Wrapper();
    });

    it('Breaks strings longer than "cols" characters', (): void => {
        const long = wrapper.wrap(FIXTURE, 20);

        expect(long.join(Terminal.EOL)).toBe(
            'The quick brown \u001B[31mfox\u001B[39m\n\u001B[31mjumped over \u001B[39mthe lazy\n\u001B[31mdog and then ran\u001B[39m\n\u001B[31maway with the\u001B[39m\n\u001B[31mquokka.\u001B[39m'
        );
        expect(long.every((line): boolean => stripAnsi(line).length <= 5)).toBeTruthy();

        const short = wrapper.wrap(FIXTURE, 5);

        expect(short.join(Terminal.EOL)).toBe(
            'The\nquick\nbrown\n\u001B[31mfox j\u001B[39m\n\u001B[31mumped\u001B[39m\n\u001B[31mover\u001B[39m\n\u001B[31m\u001B[39mthe\nlazy\n\u001B[31mdog\u001B[39m\n\u001B[31mand\u001B[39m\n\u001B[31mthen\u001B[39m\n\u001B[31mran\u001B[39m\n\u001B[31maway\u001B[39m\n\u001B[31mwith\u001B[39m\n\u001B[31mthe\u001B[39m\n\u001B[31munico\u001B[39m\n\u001B[31mrn.\u001B[39m'
        );
        expect(short.every((line): boolean => stripAnsi(line).length <= 20)).toBeTruthy();
    });

    it('Removes last row if it contained only ansi escape codes', (): void => {
        expect(
            stripAnsi(wrap(red('helloworld'), 2))
                .split('\n')
                .every((line): boolean => line.length === 2)
        ).toBeTruthy();
    });

    it('Does not prepend newline if first word is split', (): void => {
        const result = wrapper.wrap(`${red('hello')}world`, 5);

        expect(result.length).toBe(2);
    });

    it('Takes into account line returns inside input', (): void => {
        expect(mapWrap(['12345678', '901234567890'], 10)).toBe('12345678\n9012345678\n90');
    });

    it('No word-wrapping and no trimming', (): void => {
        expect(mapWrap(['12345678', '901234567890 12345'], 13)).toBe('12345678\n901234567890 \n12345');
        expect(wrap('12345678', 5)).toBe('12345\n678');
        expect(wrap('12345678 ', 5)).toBe('12345\n678 ');
        expect(wrap(FIXTURE, 5)).toBe(
            'The q\nuick \nbrown\n \u001B[31mfox \u001B[39m\n[31mjumpe[39m\n[31md ove[39m\n[31mr \u001B[39mthe\n lazy\n \u001B[31mdog \u001B[39m\n[32mand t[39m\n[32mhen r[39m\n[32man aw[39m\n[32may wi[39m\n[32mth th[39m\n[32me uni[39m\n[32mcorn.\u001B[39m'
        );
    });

    it('Supports full width characters', (): void => {
        expect(wrap('안녕하세', 4)).toBe('안녕\n하세');
    });

    it('Supports unicode surrogate pairs', (): void => {
        expect(wrap('a\uD83C\uDE00bc', 2)).toBe('a\n\uD83C\uDE00\nbc');
        expect(wrap('a\uD83C\uDE00bc\uD83C\uDE00d\uD83C\uDE00', 2)).toBe(
            'a\n\uD83C\uDE00\nbc\n\uD83C\uDE00\nd\n\uD83C\uDE00'
        );
    });

    it('Wraps whitespace', (): void => {
        expect(wrap('   ', 2)).toBe('  \n ');
        expect(wrap('foo bar', 3)).toBe('foo\n \nbar');
    });
});
