<p align="center"><img width="100%" src="https://cdn.jsdelivr.net/gh/keindev/stdout-update/media/logo.svg" alt="stdout-update logo"></p>

<p align="center">
    <a href="https://travis-ci.com/keindev/stdout-update"><img src="https://travis-ci.com/keindev/stdout-update.svg?branch=master" alt="Build Status"></a>
    <a href="https://codecov.io/gh/keindev/stdout-update"><img src="https://codecov.io/gh/keindev/stdout-update/branch/master/graph/badge.svg" /></a>
    <a href="https://www.npmjs.com/package/stdout-update"><img alt="npm" src="https://img.shields.io/npm/v/stdout-update.svg"></a>
    <a href="https://www.npmjs.com/package/stdout-update"><img alt="NPM" src="https://img.shields.io/npm/l/stdout-update.svg"></a>

</p>

Purely and accurately overwrites the previous output in the terminal, while maintaining the history of third-party logs.

<p align="center">
    <img src="media/demo.gif">
</p>

## Install

```
npm install stdout-update
```

## Usage

```javascript
const { UpdateManager } = require('stdout-update');

const manager = UpdateManager.getInstance();
const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const messages = ['Swapping time and space...', 'Have a good day.', "Don't panic...", 'Updating Updater...', '42'];
let i = (j = 0);
let ticks = 60;

manager.hook();
console.log(' - log message');
console.error(' - error message');
console.warn(' - warn message');

const id = setInterval(() => {
    if (--ticks < 0) {
        clearInterval(id);
        manager.update(['✔ Success', '', 'Messages:'], 0);
        manager.unhook(false);
    } else {
        const frame = frames[(i = ++i % frames.length)];
        const message = messages[(j = Math.round(ticks / 10) % messages.length)];

        manager.update([`${frame} Some process...`, message]);
    }
}, 80);
```

## API

Read the [API documentation](docs/api/index.md) for more information.

## Examples

[tasktree-cli](https://github.com/keindev/tasktree) - simple terminal task tree, helps you keep track of your tasks in a tree structure.

## License

[MIT](LICENSE)
