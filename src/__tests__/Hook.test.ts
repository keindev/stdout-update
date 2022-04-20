// eslint-disable-next-line node/no-extraneous-import
import { jest } from '@jest/globals';
import ansiEscapes from 'ansi-escapes';
import tty from 'tty';

import { Hook } from '../Hook.js';
// eslint-disable-next-line jest/no-mocks-import
import { WriteStream } from './__mocks__/WriteStream.mock.js';

const stream = new WriteStream() as unknown as WriteStream & tty.WriteStream;
const hook = new Hook(stream);
const callback = jest.fn();

describe('Hook', (): void => {
  it('Activate', (): void => {
    hook.active();

    expect(stream._stack.pop()).toBe(ansiEscapes.cursorHide);
  });

  it('Write (String)', (): void => {
    hook.write('line 1');
    hook.erase(1);
    stream.write('line 2', callback);
    hook.write('line 3');

    expect(stream._stack).toStrictEqual(['line 1', ansiEscapes.eraseLines(2), 'line 3']);
    expect(callback.mock.calls.length).toBe(1);
  });

  it('Write (Buffers)', (): void => {
    stream.write('line 4', 'utf8', callback);
    stream.write(Buffer.from('line 5', 'utf8'), callback);
    stream.write(new Uint8Array(Buffer.from('line 6', 'utf8')), callback);

    expect(callback.mock.calls.length).toBe(4);
  });

  it('Deactivate', (): void => {
    hook.inactive(true);

    expect(stream._stack).toStrictEqual([
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
