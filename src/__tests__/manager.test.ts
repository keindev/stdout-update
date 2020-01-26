/* eslint-disable no-underscore-dangle */
/* eslint-disable jest/no-mocks-import */
import tty from 'tty';
import ansiEscapes from 'ansi-escapes';
import { WriteStream } from '../__mocks__/WriteStream.mock';
import { UpdateManager } from '../update-manager';
import { Wrapper } from '../wrapper';
import { Terminal } from '../terminal';

const stdout = (new WriteStream() as unknown) as WriteStream & tty.WriteStream;
const stderr = (new WriteStream() as unknown) as WriteStream & tty.WriteStream;
const manager = UpdateManager.getInstance(stdout, stderr);

describe('UpdateManager', (): void => {
    beforeEach((): void => {
        stdout.__stack = [];
        stderr.__stack = [];
    });

    it('Hook stream', (): void => {
        expect(manager).toEqual(UpdateManager.getInstance());
        expect(manager.isHooked()).toBeFalsy();
        expect(manager.hook()).toBeTruthy();
        expect(manager.isHooked()).toBeTruthy();
        expect(stdout.__stack).toStrictEqual([ansiEscapes.cursorHide]);
    });

    it('Update lines', (): void => {
        manager.update(['line 1']);
        manager.update(['line 2'], 1);

        expect(stdout.__stack).toStrictEqual(['line 1', Wrapper.EMPTY, 'line 2', Wrapper.EMPTY]);
    });

    it('Update lines with empty array', (): void => {
        manager.update([]);
        manager.update([], 1);

        expect(stdout.__stack).toStrictEqual([]);
    });

    it('Update terminal active area', (): void => {
        const terminal: Terminal = new Terminal((stdout as unknown) as NodeJS.WriteStream);
        const list: string[] = [];
        const position = 10;
        let i = 0;

        while (i <= terminal.getHeight()) list.push(`line ${i++}`);

        manager.update([...list, ...list]);
        stdout.clear();

        expect(manager.getLastLength()).toBe(list.length * 2);
        expect(manager.getOutside()).toBe(list.length + 1);
        expect(stdout.__stack).toStrictEqual([]);

        manager.update(list, position);

        expect(stdout.__stack.length).toBe(list.length - (manager.getOutside() - position) + 1);

        if (process.platform === 'win32') {
            expect(stdout.__stack).toStrictEqual([
                ansiEscapes.eraseLines(terminal.getHeight() + 1),
                'line 4',
                'line 5',
                'line 6',
                'line 7',
                'line 8',
                'line 9',
                'line 10',
                'line 11',
                Wrapper.EMPTY,
            ]);
        } else {
            expect(stdout.__stack).toStrictEqual([
                ansiEscapes.eraseLines(terminal.getHeight() + 1),
                'line 5',
                'line 6',
                'line 7',
                'line 8',
                'line 9',
                'line 10',
                'line 11',
                'line 12',
                Wrapper.EMPTY,
            ]);
        }
    });

    it('Unhook stream', (): void => {
        expect(manager.isHooked()).toBeTruthy();
        expect(manager.unhook()).toBeTruthy();
        expect(stdout.__stack).toStrictEqual([ansiEscapes.cursorShow]);
    });
});
