<p align="center"><img width="100%" src="https://cdn.jsdelivr.net/gh/keindev/stdout-update/media/logo.svg" alt="stdout-update logo"></p>

<p align="center">
    <a href="https://codecov.io/gh/keindev/stdout-update"><img src="https://codecov.io/gh/keindev/stdout-update/branch/master/graph/badge.svg" /></a>
    <a href="https://www.npmjs.com/package/stdout-update"><img alt="npm" src="https://img.shields.io/npm/v/stdout-update.svg"></a>
    <a href="https://www.npmjs.com/package/stdout-update"><img alt="NPM" src="https://img.shields.io/npm/l/stdout-update.svg"></a>
</p>

Purely and accurately overwrites the previous output in the terminal, while maintaining the history of third-party logs.

<p align="center">
    <img src="media/demo.gif">
</p>

## Install

### Yarn

```
yarn add stdout-update

```

### NPM

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

### getInstance()

Method to get the object to control the streams (`stdout`, `stderr`) update. Returns `UpdateManager` instance.

### hook()

Hook stdout and stderr streams. Returns success status.

### unhook([separateHistory])

Unhooks both stdout and stderr streams and print their story of logs. Returns success status.

#### separateHistory

Type: `boolean`

Default: `false`

If `true`, will add an empty line to the history output for individual recorded lines and console logs.

### update(rows, [from])

Method to get the object to control the streams (`stdout`, `stderr`) update. Returns `UpdateManager` instance.

#### rows

Type: `string[]`

Text lines to write to standard output.

#### from

Type: `number`

Default: `0`

Index of the line starting from which the contents of the terminal are being overwritten.

### getLastLength()

Returns last printed rows count.

### getOutside()

Returns rows count outside editable area.

### isHooked()

Returns the activity status of the hook.

## Examples

[tasktree-cli](https://github.com/keindev/tasktree) - Simple terminal task tree - helps you keep track of your tasks in a tree structure.

## License

[MIT](LICENSE)
