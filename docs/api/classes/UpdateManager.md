# Class: UpdateManager

## Table of contents

### Accessors

- [isHooked](UpdateManager.md#ishooked)
- [lastLength](UpdateManager.md#lastlength)
- [outside](UpdateManager.md#outside)

### Methods

- [erase](UpdateManager.md#erase)
- [hook](UpdateManager.md#hook)
- [unhook](UpdateManager.md#unhook)
- [update](UpdateManager.md#update)
- [getInstance](UpdateManager.md#getinstance)

## Accessors

### isHooked

• `get` **isHooked**(): `boolean`

Hook activity status

#### Returns

`boolean`

___

### lastLength

• `get` **lastLength**(): `number`

Last printed rows count

#### Returns

`number`

___

### outside

• `get` **outside**(): `number`

Rows count outside editable area

#### Returns

`number`

## Methods

### erase

▸ **erase**(`count?`): `void`

Removes from the bottom of output up the specified count of lines

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `count` | `number` | lines count to remove |

#### Returns

`void`

___

### hook

▸ **hook**(): `boolean`

Hook stdout and stderr streams

#### Returns

`boolean`

Success status

___

### unhook

▸ **unhook**(`separateHistory?`): `boolean`

Unhooks both stdout and stderr streams and print their story of logs

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `separateHistory` | `boolean` | `true` | If `true`, will add an empty line to the history output for individual recorded lines and console logs |

#### Returns

`boolean`

Success status

___

### update

▸ **update**(`rows`, `from?`): `void`

Update output

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `rows` | `string`[] | `undefined` | Text lines to write to standard output |
| `from` | `number` | `0` | Index of the line starting from which the contents of the terminal are being overwritten |

#### Returns

`void`

___

### getInstance

▸ `Static` **getInstance**(`stdout?`, `stderr?`): [`UpdateManager`](UpdateManager.md)

Method to get the object to control the streams update

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stdout` | `WriteStream` | [process.stdout](https://nodejs.org/api/process.html#process_process_stdout) |
| `stderr` | `WriteStream` | [process.stderr](https://nodejs.org/api/process.html#process_a_note_on_process_i_o) |

#### Returns

[`UpdateManager`](UpdateManager.md)
