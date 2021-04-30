import ansiEscapes from 'ansi-escapes';
import tty from 'tty';

// eslint-disable-next-line jest/no-mocks-import
import { WriteStream } from '../__mocks__/WriteStream.mock';
import { Terminal } from '../Terminal';
import { UpdateManager } from '../UpdateManager';

const stdout = (new WriteStream() as unknown) as WriteStream & tty.WriteStream;
const stderr = (new WriteStream() as unknown) as WriteStream & tty.WriteStream;
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

    expect(stdout._stack).toStrictEqual(['line 1', '', 'line 2', '']);
  });

  it('Update lines with empty array', (): void => {
    manager.update([]);
    manager.update([], 1);

    expect(stdout._stack).toStrictEqual([]);
  });

  it('Update terminal active area', (): void => {
    const terminal: Terminal = new Terminal((stdout as unknown) as NodeJS.WriteStream);
    const list: string[] = [];
    const position = 10;
    let i = 0;

    while (i <= terminal.getHeight()) list.push(`line ${i++}`);

    manager.update([...list, ...list]);
    stdout.clear();

    expect(manager.lastLength).toBe(list.length * 2);
    expect(manager.outside).toBe(list.length + 1);
    expect(stdout._stack).toStrictEqual([]);

    manager.update(list, position);

    expect(stdout._stack.length).toBe(list.length - (manager.outside - position) + 1);

    const code = ansiEscapes.eraseLines(terminal.getHeight() + 1);

    expect(stdout._stack).toStrictEqual(
      process.platform === 'win32'
        ? [code, 'line 4', 'line 5', 'line 6', 'line 7', 'line 8', 'line 9', 'line 10', 'line 11', '']
        : [code, 'line 5', 'line 6', 'line 7', 'line 8', 'line 9', 'line 10', 'line 11', 'line 12', '']
    );
  });

  it('Unhook stream', (): void => {
    expect(manager.isHooked).toBeTruthy();
    expect(manager.unhook()).toBeTruthy();
    expect(stdout._stack).toStrictEqual([ansiEscapes.cursorShow]);
  });
});
