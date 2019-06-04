import { UpdateManager } from '../src/manager';

const manager = UpdateManager.getInstance();

it('Hook', (): void => {
    expect(manager).toEqual(UpdateManager.getInstance());
});
