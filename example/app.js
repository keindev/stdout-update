const { UpdateManager } = require('../lib/manager.js');
const manager = UpdateManager.getInstance();

manager.hook();

console.log(111);
manager.update(['--- 111 ---']);
console.log(121);
manager.update(['--- 121 ---']);
console.log(131);

manager.unhook();
