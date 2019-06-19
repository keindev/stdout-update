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
        expect(manager.isHooked()).toBeTruthy();

        manager.update(['test text']);
        manager.update(['text test']);

        expect(stdout.__stack.length).toBe(4);
        expect(manager.isHooked()).toBeTruthy();
    });

    it('Unhook', (): void => {
        expect(manager.isHooked()).toBeTruthy();
        expect(manager.unhook()).toBeTruthy();
        expect(manager.unhook()).toBeTruthy();
        expect(manager.isHooked()).toBeFalsy();
    });
});
