import ansiEscapes from 'ansi-escapes';
import { UpdateManager } from '../src/update-manager';
import { ReadStream, WriteStream } from './mocks/stream.mock';

const ROWS = 12;
const COLUMNS = 80;
const stdin = new ReadStream();
const stdout = new WriteStream(COLUMNS, ROWS);
const stderr = new WriteStream(COLUMNS, ROWS);
const manager = UpdateManager.getInstance(stdin, stdout, stderr);

stdout.emit = jest.fn((event: string | symbol, ...args: any[]): boolean => {
    expect(args[0]).toBe(ansiEscapes.cursorGetPosition);

    // eslint-disable-next-line no-underscore-dangle
    return stdin.emit(event, stdout.__stack.pop());
});

describe('UpdateManager', (): void => {
    it('Hook', (done): void => {
        expect(manager).toEqual(UpdateManager.getInstance());
        expect(manager.isHooked()).toBeFalsy();

        manager.hook().then((status): void => {
            expect(status).toBeTruthy();
            expect(manager.isHooked()).toBeTruthy();

            done();

            manager.hook().then((): void => {
                expect(manager.isHooked()).toBeTruthy();
                done();
            });
        });
    });

    it('Update', (): void => {
        expect(manager.isHooked()).toBeTruthy();

        manager.update('test text');
        manager.update('text test');

        expect(manager.isHooked()).toBeTruthy();
    });

    it('Unhook', (): void => {
        expect(manager.isHooked()).toBeTruthy();

        manager.unhook();
        manager.unhook();

        expect(manager.isHooked()).toBeFalsy();
    });
});
