/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */

type Callback = (...args: any[]) => void;

class Socket {
    public readonly isTTY?: true;

    public constructor() {
        this.isTTY = true;
    }

    public _destroy(err: Error, callback: (err?: Error) => void): void {
        throw new Error('Method not implemented.');
    }

    public [Symbol.asyncIterator](): AsyncIterableIterator<string | Buffer> {
        throw new Error('Method not implemented.');
    }

    public destroy(error?: Error): void {
        throw new Error('Method not implemented.');
    }

    public setEncoding(encoding: string): this {
        throw new Error('Method not implemented.');
    }

    public pause(): this {
        throw new Error('Method not implemented.');
    }

    public resume(): this {
        throw new Error('Method not implemented.');
    }

    public isPaused(): boolean {
        throw new Error('Method not implemented.');
    }

    public pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean }): T {
        throw new Error('Method not implemented.');
    }

    public unpipe(destination?: NodeJS.WritableStream): this {
        throw new Error('Method not implemented.');
    }

    public unshift(chunk: string | Buffer | Uint8Array): void {
        throw new Error('Method not implemented.');
    }

    public wrap(oldStream: NodeJS.ReadableStream): this {
        throw new Error('Method not implemented.');
    }

    public addListener(event: string | symbol, listener: Callback): this {
        throw new Error('Method not implemented.');
    }

    public on(event: string | symbol, listener: Callback): this {
        throw new Error('Method not implemented.');
    }

    public once(event: string | symbol, listener: Callback): this {
        throw new Error('Method not implemented.');
    }

    public removeListener(event: string | symbol, listener: Callback): this {
        throw new Error('Method not implemented.');
    }

    public off(event: string | symbol, listener: Callback): this {
        throw new Error('Method not implemented.');
    }

    public removeAllListeners(event?: string | symbol): this {
        throw new Error('Method not implemented.');
    }

    public setMaxListeners(n: number): this {
        throw new Error('Method not implemented.');
    }

    public getMaxListeners(): number {
        throw new Error('Method not implemented.');
    }

    public listeners(event: string | symbol): Function[] {
        throw new Error('Method not implemented.');
    }

    public rawListeners(event: string | symbol): Function[] {
        throw new Error('Method not implemented.');
    }

    public emit(event: string | symbol, ...args: any[]): boolean {
        throw new Error('Method not implemented.');
    }

    public listenerCount(type: string | symbol): number {
        throw new Error('Method not implemented.');
    }

    public prependListener(event: string | symbol, listener: Callback): this {
        throw new Error('Method not implemented.');
    }

    public prependOnceListener(event: string | symbol, listener: Callback): this {
        throw new Error('Method not implemented.');
    }

    public eventNames(): (string | symbol)[] {
        throw new Error('Method not implemented.');
    }

    public write(str: any, encoding?: any, cb?: any): boolean {
        throw new Error('Method not implemented.');
    }

    public end(str?: any, encoding?: any, cb?: any): void {
        throw new Error('Method not implemented.');
    }

    public read(size?: number): string | Buffer {
        throw new Error('Method not implemented.');
    }
}

class Writable extends Socket {
    public writableHighWaterMark: number = 0;
    public writableLength: number = 0;

    public _write(chunk: any, encoding: string, callback: (err?: Error) => void): void {
        throw new Error('Method not implemented.');
    }

    public _final(callback: (err?: Error) => void): void {
        throw new Error('Method not implemented.');
    }

    public setDefaultEncoding(encoding: string): this {
        throw new Error('Method not implemented.');
    }

    public cork(): void {
        throw new Error('Method not implemented.');
    }

    public uncork(): void {
        throw new Error('Method not implemented.');
    }
}

export class WriteStream extends Writable implements NodeJS.WriteStream {
    public readonly readable: boolean = false;
    public readonly writable: boolean = true;
    public readonly writableFinished: boolean = false;

    public columns: number;
    public rows: number;

    public __stack: any[] = [];

    public constructor(columns: number, rows: number) {
        super();

        this.columns = columns;
        this.rows = rows;
    }

    public write(str: any, encoding?: any, cb?: any): boolean {
        if (typeof str === 'string') {
            this.__stack.push(...str.split('\n'));
        } else {
            this.__stack.push(str);
        }

        return true;
    }

    public clear(): void {
        this.__stack = [];
    }
}
