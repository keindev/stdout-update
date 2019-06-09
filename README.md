<p align="center"><img width="100%" src=src="https://cdn.jsdelivr.net/gh/keindev/stdout-update/media/logo.svg" alt="stdout-update logo"></p>

<p align="center">
    <a href="https://travis-ci.org/keindev/stdout-update"><img src="https://travis-ci.org/keindev/stdout-update.svg?branch=master" alt="Build Status"></a>
    <a href="https://codecov.io/gh/keindev/stdout-update"><img src="https://codecov.io/gh/keindev/stdout-update/branch/master/graph/badge.svg" /></a>
    <a href="https://www.npmjs.com/package/stdout-update"><img alt="npm" src="https://img.shields.io/npm/v/stdout-update.svg"></a>
    <a href="https://www.npmjs.com/package/stdout-update"><img alt="NPM" src="https://img.shields.io/npm/l/stdout-update.svg"></a>
    <a href="https://snyk.io/test/github/keindev/stdout-update?targetFile=package.json"><img src="https://snyk.io/test/github/keindev/stdout-update/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/keindev/stdout-update?targetFile=package.json" style="max-width:100%;"></a>
</p>

Purely and accurately overwrites the previous output in the terminal, while maintaining the history of third-party logs.

<img src="media/demo.gif">

## Install

```console
npm install stdout-update

yarn add stdout-update
```

## Usage

```javascript
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
```

## API

### getInstance()

Method to get the object to control the streams (`stdout`, `stderr`) update. Returns `UpdateManager` instance.

### hook()

Hook stdout and stderr streams.

### unhook()

Unhooks both stdout and stderr streams and print their story of logs.

### update(lines, [position])

Method to get the object to control the streams (`stdout`, `stderr`) update. Returns `UpdateManager` instance.

#### lines

Type: `string[]`

Lines to write to standard output.

#### position

Type: `number`

Default: `0`

Index of the line starting from which the contents of the terminal are being overwritten.

### isHooked()

Returns the activity status of the hook.

## Examples

[tasktree-cli](https://github.com/keindev/tasktree) - Simple terminal task tree - helps you keep track of your tasks in a tree structure.

## License

[MIT](LICENSE)
