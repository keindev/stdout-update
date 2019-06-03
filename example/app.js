const { UpdateManager } = require('../lib/manager.js');
const manager = UpdateManager.getInstance();

manager.hook();
console.log(' - log message');
console.error(' - error message');
console.warn(' - warn message');

const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
let i = 0;
let number = 30;

const id = setInterval(() => {
    if (--number < 0) {
        clearInterval(id);
        manager.update(['', 'Messages:'], 1);
        manager.unhook();
    } else {
        const frame = frames[(i = ++i % frames.length)];

        manager.update([`${frame} some process...`, '--- end ---']);
    }
}, 80);
