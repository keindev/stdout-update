import stripAnsi from 'strip-ansi';
import { Wrapper } from '../src/wrapper';
import { Terminal } from '../src/terminal';

let wrapper: Wrapper;

const red = (msg: string): string => `\u001b[31m${msg}\u001b[39m`;
const wrap = (str: string, limit: number): string => wrapper.wrap(str, limit).join(Terminal.EOL);
const COLUMNS = 5;
const FIXTURE_0 = `The quick brown ${red('fox jumped over ')} the lazy ${red(
    'dog and then ran away with the quokka.'
)}`;
const FIXTURE_1 = '12345678\n901234567890';
const FIXTURE_2 = '12345678\n901234567890 12345';
const FIXTURE_3 = '12345678\n';
const FIXTURE_4 = '12345678\n ';

describe('Wrapper', (): void => {
    beforeEach((): void => {
        wrapper = new Wrapper(COLUMNS);
    });

    it('Breaks strings longer than "cols" characters', (): void => {
        const result = wrapper.wrap(FIXTURE_0, 5).join(Terminal.EOL);

        expect(result).toBe(
            'The\nquick\nbrown\n\u001B[31mfox j\u001B[39m\n\u001B[31mumped\u001B[39m\n\u001B[31mover\u001B[39m\n\u001B[31m\u001B[39mthe\nlazy\n\u001B[32mdog\u001B[39m\n\u001B[32mand\u001B[39m\n\u001B[32mthen\u001B[39m\n\u001B[32mran\u001B[39m\n\u001B[32maway\u001B[39m\n\u001B[32mwith\u001B[39m\n\u001B[32mthe\u001B[39m\n\u001B[32munico\u001B[39m\n\u001B[32mrn.\u001B[39m'
        );
        expect(
            stripAnsi(result)
                .split('\n')
                .every((line): boolean => line.length <= 5)
        ).toBeTruthy();
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
        const result = wrapper.wrap(FIXTURE_1, 10).join(Terminal.EOL);

        expect(result).toBe('12345678\n9012345678\n90');
    });

    it('No word-wrapping and no trimming', (): void => {
        expect(wrap(FIXTURE_2, 13)).toBe('12345678\n901234567890 \n12345');
        expect(wrap(FIXTURE_3, 5)).toBe('12345\n678\n');
        expect(wrap(FIXTURE_4, 5)).toBe('12345\n678\n ');
        expect(wrap(FIXTURE_0, 5)).toBe(
            'The q\nuick \nbrown\n \u001B[31mfox \u001B[39m\n[31mjumpe[39m\n[31md ove[39m\n[31mr \u001B[39mthe\n lazy\n \u001B[32mdog \u001B[39m\n[32mand t[39m\n[32mhen r[39m\n[32man aw[39m\n[32may wi[39m\n[32mth th[39m\n[32me uni[39m\n[32mcorn.\u001B[39m'
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
