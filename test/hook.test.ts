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
    getBuffer(str: string): Buffer {
        return Buffer.from(str, 'utf8');
    },
    getArrayBuffer(str: string): Uint8Array {
        return new Uint8Array(Buffer.from(this.getBuffer(str), 'utf8'));
    },
    write(str: string, cb?: () => void): boolean {
        if (cb) cb();

        return !!output.push(str);
    },
};
const hook = new Hook(stream);
let msg1: string;
let msg2: string;

describe('Hook', (): void => {
    it('Active', (): void => {
        hook.active();
        expect(output.pop()).toBe(ansiEscapes.cursorHide);
    });

    it('Write', (): void => {
        hook.write(stream.testMessage());
        expect(output.length).toBe(stream.messagesCount);

        hook.clear(stream.messagesCount);
        expect(output.pop()).toBe(ansiEscapes.eraseLines(stream.messagesCount + 1));

        stream.write(stream.testMessage(), stream.testCallback);
        hook.write(stream.testMessage());
        expect(output.length).toBe(stream.messagesCount - 1);
        expect(stream.callbacksCount).toBe(1);
    });

    it('Write (others)', (): void => {
        stream.write(stream.testMessage(), 'utf8', stream.testCallback);
        expect(stream.callbacksCount).toBe(2);

        stream.write(stream.getBuffer((msg1 = stream.testMessage())), stream.testCallback);
        expect(stream.callbacksCount).toBe(3);

        stream.write(stream.getArrayBuffer((msg2 = stream.testMessage())), stream.testCallback);
        expect(stream.callbacksCount).toBe(4);
    });

    it('Inactive', (): void => {
        hook.inactive();

        expect(output.pop()).toBe(ansiEscapes.cursorShow);
        expect(output.length).toBe(stream.messagesCount);
        expect(output.pop()).toBe(msg2);
        expect(output.pop()).toBe(msg1);
    });
});
