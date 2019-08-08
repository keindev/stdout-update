/* eslint-disable no-underscore-dangle */
import ansiEscapes from 'ansi-escapes';
import { Hook } from '../src/hook';
import { MockWriteStream } from './__mocks__/stream.mock';

const stream: MockWriteStream = new MockWriteStream();
const hook = new Hook(stream);
const callback = jest.fn();

describe('Hook', (): void => {
    it('Active', (): void => {
        hook.active();

        expect(stream.__stack.pop()).toBe(ansiEscapes.cursorHide);
    });

    it('Write (String)', (): void => {
        hook.write('line 1');
        hook.clear(1);
        stream.write('line 2', callback);
        hook.write('line 3');

        expect(stream.__stack).toStrictEqual(['line 1', ansiEscapes.eraseLines(2), 'line 3']);
        expect(callback.mock.calls.length).toBe(1);
    });

    it('Write (Buffers)', (): void => {
        stream.write('line 4', 'utf8', callback);
        stream.write(Buffer.from('line 5', 'utf8'), callback);
        stream.write(new Uint8Array(Buffer.from('line 6', 'utf8')), callback);

        expect(callback.mock.calls.length).toBe(4);
    });

    it('Inactive', (): void => {
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
