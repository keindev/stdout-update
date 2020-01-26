/* eslint-disable no-underscore-dangle */
/* eslint-disable jest/no-mocks-import */
import tty from 'tty';
import ansiEscapes from 'ansi-escapes';
import { WriteStream } from '../__mocks__/WriteStream.mock';
import { Hook } from '../hook';

const stream = (new WriteStream() as unknown) as WriteStream & tty.WriteStream;
const hook = new Hook(stream);
const callback = jest.fn();

describe('Hook', (): void => {
    it('Hook activate', (): void => {
        hook.active();

        expect(stream.__stack.pop()).toBe(ansiEscapes.cursorHide);
    });

    it('Hook write (String)', (): void => {
        hook.write('line 1');
        hook.clear(1);
        stream.write('line 2', callback);
        hook.write('line 3');

        expect(stream.__stack).toStrictEqual(['line 1', ansiEscapes.eraseLines(2), 'line 3']);
        expect(callback.mock.calls.length).toBe(1);
    });

    it('Hook write (Buffers)', (): void => {
        stream.write('line 4', 'utf8', callback);
        stream.write(Buffer.from('line 5', 'utf8'), callback);
        stream.write(new Uint8Array(Buffer.from('line 6', 'utf8')), callback);

        expect(callback.mock.calls.length).toBe(4);
    });

    it('Hook deactivate', (): void => {
        hook.inactive(true);

        expect(stream.__stack).toStrictEqual([
            'line 1',
            ansiEscapes.eraseLines(2),
            'line 3',
            '',
            '',
            'line 2',
            'line 4',
            'line 5',
            'line 6',
            ansiEscapes.cursorShow,
        ]);
    });
});
