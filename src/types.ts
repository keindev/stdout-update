export type WritableData = string | Buffer | Uint8Array;
export type WritableEncoding = string | undefined;
export type WritableCallback = ((err?: Error | null | undefined) => void) | undefined;
export type WritableArgs = [WritableEncoding?, WritableCallback?] | [WritableCallback?];

export interface WritableFunction {
    (buffer: WritableData, cb?: WritableCallback): boolean;
    (str: string, encoding?: WritableEncoding, cb?: WritableCallback): boolean;
}
