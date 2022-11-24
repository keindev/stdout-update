/* eslint-disable */
import UpdateManager from '../src/index.js';

const TICKS = 60;
const TIMEOUT = 80;
const manager = UpdateManager.getInstance();
const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const messages = ['Swapping time and space...', 'Have a good day.', "Don't panic...", 'Updating Updater...', '42'];
let ticks = TICKS;
let i = 0;

manager.hook();

// eslint-disable-next-line no-console
console.log(' - log message');
// eslint-disable-next-line no-console
console.error(' - error message');
// eslint-disable-next-line no-console
console.warn(' - warn message');

const id = setInterval(() => {
  if (--ticks < 0) {
    clearInterval(id);
    manager.update(['✔ Success', '', 'Messages:', 'this line is be deleted!!!']);
    manager.erase(1);
    manager.unhook(false);
  } else {
    const frame = frames[(i = ++i % frames.length)];
    const index = Math.round(ticks / 10) % messages.length;
    const message = messages[index];

    if (message) manager.update([`${frame} Some process...`, message]);
  }
}, TIMEOUT);
