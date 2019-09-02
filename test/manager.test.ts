/* eslint-disable no-underscore-dangle */
import ansiEscapes from 'ansi-escapes';
import { UpdateManager } from '../src/update-manager';
import { MockWriteStream } from './__mocks__/stream.mock';
import { Wrapper } from '../src/wrapper';
import { Terminal } from '../src/terminal';

describe('UpdateManager', (): void => {
    const $stdout = new MockWriteStream();
    const $stderr = new MockWriteStream();
    const $manager = UpdateManager.getInstance($stdout, $stderr);

    beforeEach((): void => {
        $stdout.__stack = [];
        $stderr.__stack = [];
    });

    it('Hook', (): void => {
        expect($manager).toEqual(UpdateManager.getInstance());
        expect($manager.isHooked()).toBeFalsy();
        expect($manager.hook()).toBeTruthy();
        expect($manager.isHooked()).toBeTruthy();
        expect($stdout.__stack).toStrictEqual([ansiEscapes.cursorHide]);
    });

    it('Update', (): void => {
        $manager.update(['line 1']);
        $manager.update(['line 2'], 1);

        expect($stdout.__stack).toStrictEqual(['line 1', Wrapper.EMPTY, 'line 2', Wrapper.EMPTY]);
    });

    it('Update with empty array', (): void => {
        $manager.update([]);
        $manager.update([], 1);

        expect($stdout.__stack).toStrictEqual([]);
    });

    it('Update terminal active area', (): void => {
        const terminal: Terminal = new Terminal($stdout);
        const list: string[] = [];
        const position = 10;
        let i = 0;

        while (i <= terminal.getHeight()) list.push(`line ${i++}`);

        $manager.update([...list, ...list]);
        $stdout.clear();

        expect($manager.getLastLength()).toBe(list.length * 2);
        expect($manager.getOutside()).toBe(list.length + 1);
        expect($stdout.__stack).toStrictEqual([]);

        $manager.update(list, position);

        expect($stdout.__stack.length).toBe(list.length - ($manager.getOutside() - position) + 1);
        expect($stdout.__stack).toStrictEqual([
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
    });

    it('Unhook', (): void => {
        expect($manager.isHooked()).toBeTruthy();
        expect($manager.unhook()).toBeTruthy();
        expect($stdout.__stack).toStrictEqual([ansiEscapes.cursorShow]);
    });
});
