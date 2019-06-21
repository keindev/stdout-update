/* eslint-disable no-underscore-dangle */
import { UpdateManager } from '../src/update-manager';
import { WriteStream } from './mocks/stream.mock';

const ROWS = 12;
const COLUMNS = 80;
const stdout = new WriteStream(COLUMNS, ROWS);
const stderr = new WriteStream(COLUMNS, ROWS);
const manager = UpdateManager.getInstance(stdout, stderr);

describe('UpdateManager', (): void => {
    it('Hook', (): void => {
        expect(manager).toEqual(UpdateManager.getInstance());
        expect(manager.isHooked()).toBeFalsy();

        expect(manager.hook()).toBeTruthy();
        expect(manager.isHooked()).toBeTruthy();

        expect(manager.hook()).toBeTruthy();
        expect(manager.isHooked()).toBeTruthy();
    });

    it('Update', (): void => {
        const message1 = 'test text';
        const message2 = 'test text';

        expect(stdout.__stack.length).toBe(1);

        manager.update([message1]);

        expect(stdout.__stack.length).toBe(4);
        expect(stdout.__stack[2]).toBe(message1);

        manager.update([message2], 1);

        expect(stdout.__stack.length).toBe(7);
        expect(stdout.__stack[5]).toBe(message2);
    });

    it('Update outside', (): void => {
        const list: string[] = [];

        for (let i = 0; i <= ROWS + 1; i++) list.push(`test - ${i}`);

        expect(list.length).toBeGreaterThan(ROWS);
        expect(stdout.__stack.length).toBe(7);

        manager.update(list);

        expect(stdout.__stack.length).toBe(list.length + 9);
    });

    it('Unhook', (): void => {
        expect(manager.isHooked()).toBeTruthy();
        expect(manager.unhook()).toBeTruthy();
        expect(manager.unhook()).toBeTruthy();
        expect(manager.isHooked()).toBeFalsy();
    });
});
