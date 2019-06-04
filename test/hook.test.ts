import ansiEscapes from 'ansi-escapes';
import { Hook } from '../src/hook';

const output: string[] = [];
const stream: any = {
    callbacksCount: 0,
    messagesCount: 0,

    testCallback(): void {
        stream.callbacksCount++;
    },
    testMessage(): string {
        return `message ${++this.messagesCount}`;
    },
    write(str: string, cb?: () => void): boolean {
        console.log(arguments);
        if (cb) cb();

        return !!output.push(str);
    },
};
const hook = new Hook(stream);

it('Hook', (): void => {
    hook.active();
    expect(output.pop()).toBe(ansiEscapes.cursorHide);

    hook.write(stream.testMessage());
    expect(output.length).toBe(stream.messagesCount);

    hook.clear(stream.messagesCount);
    expect(output.pop()).toBe(ansiEscapes.eraseLines(stream.messagesCount + 1));

    stream.write(stream.testMessage(), stream.testCallback);
    hook.write(stream.testMessage());
    expect(output.length).toBe(stream.messagesCount - 1);
    expect(stream.callbacksCount).toBe(0);

    hook.inactive();
    expect(output.pop()).toBe(ansiEscapes.cursorShow);
    expect(output.length).toBe(stream.messagesCount);
    expect(stream.callbacksCount).toBe(1);
});
