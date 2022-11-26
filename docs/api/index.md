# UpdateManager

## Accessors

- `get` **lastLength**(): `number` - Last printed rows count
- `get` **outside**(): `number` - Rows count outside editable area
- `get` **isHooked**(): `boolean` - Hook activity status
- `get` **isSuspended**(): `boolean` - Suspend status for active hooks

## Methods

### getInstance

Method to get the object to control the streams update

```typescript
static getInstance(
  stdout: NodeJS.WriteStream = process.stdout,
  stderr: NodeJS.WriteStream = process.stderr
): UpdateManager
```

#### Parameters

| Name     | Type        | Description                                                                         |
| :------- | :---------- | :---------------------------------------------------------------------------------- |
| `stdout` | WriteStream | [process.stdout](https://nodejs.org/api/process.html#process_process_stdout)        |
| `stderr` | WriteStream | [process.stderr](https://nodejs.org/api/process.html#process_a_note_on_process_i_o) |

### erase

Removes from the bottom of output up the specified count of lines

#### Parameters

| Name    | Type                  | Description               |
| :------ | :-------------------- | :------------------------ |
| `count` | _number \| undefined_ | number of lines to remove |

### hook

Hook stdout and stderr streams

### resume

Resume suspend hooks

#### Parameters

| Name            | Type                  | Description             |
| :-------------- | :-------------------- | :---------------------- |
| `eraseRowCount` | _number \| undefined_ | erase output rows count |

### suspend

Suspend active hooks for external output

#### Parameters

| Name    | Type      | Description  |
| :------ | :-------- | :----------- |
| `erase` | _boolean_ | erase output |

### unhook

Unhooks both stdout and stderr streams and print their story of logs

#### Parameters

| Name              | Type      | Description                                                                                                            |
| :---------------- | :-------- | :--------------------------------------------------------------------------------------------------------------------- |
| `separateHistory` | _boolean_ | Default `true`, if `true`, will add an empty line to the history output for individual recorded lines and console logs |

### update

Update output

#### Parameters

| Name   | Type                  | Description                                                                                           |
| :----- | :-------------------- | :---------------------------------------------------------------------------------------------------- |
| `rows` | _string[]_            | Text lines to write to standard output                                                                |
| `from` | _number \| undefined_ | Default `0`, index of the line starting from which the contents of the terminal are being overwritten |
