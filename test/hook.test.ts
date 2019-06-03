import stripAnsi from 'strip-ansi';
import { Hook } from '../src/hook';

const stack: string[] = [];
const hook = new Hook({
    write(str: string): void {
        stack.push(str);
    },
} as any);

it('Test', (): void => {
    hook.active();
    hook.write('test 1');
    hook.write('test 2');
    hook.write('test 3');
    hook.inactive();

    expect(stack.length).toBe(5);
    expect(stack.map((str): string => stripAnsi(str)).filter(Boolean).length).toBe(3);
});
