import ansiEscapes from 'ansi-escapes';
import tty from 'tty';

import { Terminal } from '../Terminal.js';
import { UpdateManager } from '../UpdateManager.js';
// eslint-disable-next-line jest/no-mocks-import
import { WriteStream } from './__mocks__/WriteStream.mock.js';

const stdout = new WriteStream() as unknown as WriteStream & tty.WriteStream;
const stderr = new WriteStream() as unknown as WriteStream & tty.WriteStream;
const manager = UpdateManager.getInstance(stdout, stderr);

describe('UpdateManager', (): void => {
  beforeEach((): void => {
    stdout._stack = [];
    stderr._stack = [];
  });

  it('Hook stream', (): void => {
    expect(manager).toEqual(UpdateManager.getInstance());
    expect(manager.isHooked).toBeFalsy();
    expect(manager.hook()).toBeTruthy();
    expect(manager.isHooked).toBeTruthy();
    expect(stdout._stack).toStrictEqual([ansiEscapes.cursorHide]);
  });

  it('Update lines', (): void => {
    manager.update(['line 1']);
    manager.update(['line 2'], 1);

    expect(stdout._stack).toStrictEqual([
      'line 1' + ansiEscapes.eraseEndLine,
      '',
      'line 2' + ansiEscapes.eraseEndLine,
      ''
    ]);
  });

  it('Update lines with empty array', (): void => {
    manager.update([]);
    manager.update([], 1);

    expect(stdout._stack).toStrictEqual([]);
  });

  it('Update terminal active area', (): void => {
    const terminal: Terminal = new Terminal(stdout as unknown as NodeJS.WriteStream);
    const list: string[] = [];
    const position = 10;
    let i = 0;

    while (i <= terminal.height) list.push(`line ${i++}`);

    manager.update([...list, ...list]);
    stdout.clear();

    expect(manager.lastLength).toBe(list.length * 2);
    expect(manager.outside).toBe(list.length + 1);
    expect(stdout._stack).toStrictEqual([]);

    manager.update(list, position);

    expect(stdout._stack.length).toBe(list.length - (manager.outside - position));

    const previousLinesToOverwrite = Math.min(terminal.height, list.length * 2 - position);
    const code = ansiEscapes.eraseStartLine + ansiEscapes.cursorLeft + ansiEscapes.cursorUp(previousLinesToOverwrite);

    expect(stdout._stack).toStrictEqual(
      process.platform === 'win32'
        ? [
          code + 'line 4' + ansiEscapes.eraseEndLine,
          'line 5' + ansiEscapes.eraseEndLine,
          'line 6' + ansiEscapes.eraseEndLine,
          'line 7' + ansiEscapes.eraseEndLine,
          'line 8' + ansiEscapes.eraseEndLine,
          'line 9' + ansiEscapes.eraseEndLine,
          'line 10' + ansiEscapes.eraseEndLine,
          'line 11' + ansiEscapes.eraseEndLine,
          ''
        ]
        : [
          code + 'line 5' + ansiEscapes.eraseEndLine,
          'line 6' + ansiEscapes.eraseEndLine,
          'line 7' + ansiEscapes.eraseEndLine,
          'line 8' + ansiEscapes.eraseEndLine,
          'line 9' + ansiEscapes.eraseEndLine,
          'line 10' + ansiEscapes.eraseEndLine,
          'line 11' + ansiEscapes.eraseEndLine,
          'line 12' + ansiEscapes.eraseEndLine,
          ''
        ]
    );
  });

  it('Unhook stream', (): void => {
    expect(manager.isHooked).toBeTruthy();
    expect(manager.unhook()).toBeTruthy();
    expect(stdout._stack).toStrictEqual([ansiEscapes.cursorShow]);
  });
});
