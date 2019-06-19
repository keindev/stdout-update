/* eslint-disable no-underscore-dangle */
import ansiEscapes from 'ansi-escapes';
import { Hook } from '../src/hook';
import { WriteStream } from './mocks/stream.mock';

let count = 0;
let calls = 0;
let msg1: string;
let msg2: string;

const ROWS = 12;
const COLUMNS = 80;
const stream: WriteStream = new WriteStream(COLUMNS, ROWS);
const hook = new Hook(stream);
const message = (): string => `message ${count++}`;
const callback = (): number => calls++;
const getBuffer = (str: string): Buffer => Buffer.from(str, 'utf8');
const getArrayBuffer = (str: string): Uint8Array => new Uint8Array(getBuffer(str));

describe('Hook', (): void => {
    it('Active', (): void => {
        hook.active();
        expect(stream.__stack.pop()).toBe(ansiEscapes.cursorHide);
    });

    it('Write', (): void => {
        hook.write(message());
        expect(stream.__stack.length).toBe(count);

        hook.clear(count);
        expect(stream.__stack.pop()).toBe(ansiEscapes.eraseLines(count + 1));

        stream.write(message(), callback);
        hook.write(message());
        expect(stream.__stack.length).toBe(count - 1);
        expect(calls).toBe(1);
    });

    it('Write (others)', (): void => {
        stream.write(message(), 'utf8', callback);
        expect(calls).toBe(2);

        stream.write(getBuffer((msg1 = message())), callback);
        expect(calls).toBe(3);

        stream.write(getArrayBuffer((msg2 = message())), callback);
        expect(calls).toBe(4);
    });

    it('Inactive', (): void => {
        hook.inactive();

        expect(stream.__stack.pop()).toBe(ansiEscapes.cursorShow);
        expect(stream.__stack.length).toBe(count);
        expect(stream.__stack.pop()).toBe(msg2);
        expect(stream.__stack.pop()).toBe(msg1);
    });
});
