/* eslint-disable no-underscore-dangle */
import ansiEscapes from 'ansi-escapes';
import { UpdateManager } from '../src/update-manager';
import { WriteStream } from './mocks/stream.mock';
import { Wrapper } from '../src/wrapper';

const ROWS = 12;
const COLUMNS = 80;
const stdout = new WriteStream(COLUMNS, ROWS);
const stderr = new WriteStream(COLUMNS, ROWS);
const manager = UpdateManager.getInstance(stdout, stderr);
const list: string[] = [];

for (let i = 0; i <= ROWS + 1; i++) list.push(`test - ${i}`);

describe('UpdateManager', (): void => {
    it('Hook', (): void => {
        expect(manager).toEqual(UpdateManager.getInstance());
        expect(manager.isHooked()).toBeFalsy();

        expect(manager.hook()).toBeTruthy();
        expect(manager.isHooked()).toBeTruthy();
        expect(stdout.__stack.pop()).toBe(ansiEscapes.cursorHide);

        expect(manager.hook()).toBeTruthy();
        expect(manager.isHooked()).toBeTruthy();
        expect(stdout.__stack.length).toBe(0);
    });

    it('Update', (): void => {
        const message1 = 'test text 1';
        const message2 = 'test text 2';

        expect(stdout.__stack.length).toBe(0);

        manager.update([message1]);

        expect(stdout.__stack.pop()).toBe(Wrapper.EMPTY);
        expect(stdout.__stack.pop()).toBe(message1);
        expect(stdout.__stack.length).toBe(0);

        manager.update([message2], 1);

        expect(stdout.__stack.pop()).toBe(Wrapper.EMPTY);
        expect(stdout.__stack.pop()).toBe(message2);
        expect(stdout.__stack.length).toBe(0);
    });

    describe('Update with position', (): void => {
        it('Update outside', (): void => {
            expect(list.length).toBeGreaterThan(ROWS);
            expect(stdout.__stack.length).toBe(0);

            manager.update(list);

            expect(JSON.stringify([stdout.__stack.shift()])).toBe(JSON.stringify([ansiEscapes.eraseLines(2)]));
            expect(stdout.__stack.pop()).toBe(Wrapper.EMPTY);
            expect(stdout.__stack.length).toBe(list.length);

            list.forEach((item): void => {
                expect(stdout.__stack.shift()).toBe(item);
            });

            expect(stdout.__stack.length).toBe(0);
        });

        it('Update visible', (): void => {
            const position = 10;

            manager.update([...list, ...list]);
            stdout.clear();

            expect(manager.getLastLength()).toBe(list.length * 2);
            expect(manager.getOutside()).toBe(list.length + 2);
            expect(stdout.__stack.length).toBe(0);

            manager.update(list, position);
            expect(JSON.stringify([stdout.__stack.shift()])).toBe(JSON.stringify([ansiEscapes.eraseLines(ROWS + 1)]));
            expect(stdout.__stack.pop()).toBe(Wrapper.EMPTY);
            expect(stdout.__stack.length).toBe(list.length - (manager.getOutside() - position + 1));
            stdout.clear();
        });
    });

    it('Unhook', (): void => {
        expect(manager.isHooked()).toBeTruthy();
        expect(manager.unhook()).toBeTruthy();
        expect(stdout.__stack.pop()).toBe(ansiEscapes.cursorShow);

        expect(manager.unhook()).toBeTruthy();
        expect(manager.isHooked()).toBeFalsy();
        expect(stdout.__stack.length).toBe(0);
    });
});
