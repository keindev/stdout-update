import { UpdateManager } from '../src/update-manager';

const manager = UpdateManager.getInstance();

describe('UpdateManager', (): void => {
    it('Hook', (): void => {
        expect(manager).toEqual(UpdateManager.getInstance());
        expect(manager.isHooked()).toBeFalsy();

        manager.hook();
        manager.hook();

        expect(manager.isHooked()).toBeTruthy();
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
