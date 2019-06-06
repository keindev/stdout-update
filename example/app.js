const { UpdateManager } = require('../lib/update-manager');
const manager = UpdateManager.getInstance();

const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const messages = ['Swapping time and space...', 'Have a good day.', "Don't panic...", 'Updating Updater...', '42'];
let i = (j = 0);
let number = 60;

manager.hook();

console.log(' - log message');
console.error(' - error message');
console.warn(' - warn message');

const id = setInterval(() => {
    if (--number < 0) {
        clearInterval(id);
        manager.update(['✔ Success']);
        manager.update(['', 'Messages:'], 1);
        manager.unhook();
    } else {
        const frame = frames[(i = ++i % frames.length)];
        const message = messages[(j = Math.round(number / 10) % messages.length)];

        manager.update([`${frame} Some process...`, message]);
    }
}, 80);
