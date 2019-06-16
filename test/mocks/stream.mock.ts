/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ansiEscapes from 'ansi-escapes';

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

class Readable extends Socket {
    public readableHighWaterMark: number = 0;
    public readableLength: number = 0;

    public _read(size: number): void {
        throw new Error('Method not implemented.');
    }

    public push(chunk: any, encoding?: string): boolean {
        throw new Error('Method not implemented.');
    }
}

export class WriteStream extends Writable implements NodeJS.WriteStream {
    public readonly readable: boolean = false;
    public readonly writable: boolean = true;

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
            switch (str) {
                case ansiEscapes.cursorGetPosition:
                    this.__stack.push(`\\[${this.rows};0R`);
                    break;
                default:
                    this.__stack.push(str);
                    break;
            }
        } else {
            this.__stack.push(str);
        }

        return true;
    }
}

export class ReadStream extends Readable implements NodeJS.ReadStream {
    public readable: boolean = true;
    public writable: boolean = false;
    public isRaw?: boolean = false;

    private __isPaused: boolean = false;
    // only once events
    private __events: Map<string | symbol, Callback[]> = new Map();

    public setRawMode(mode: boolean): void {
        this.isRaw = mode;
    }

    public pause(): this {
        this.__isPaused = true;

        return this;
    }

    public resume(): this {
        this.__isPaused = false;

        return this;
    }

    public isPaused(): boolean {
        return this.__isPaused;
    }

    public emit(event: string | symbol, ...args: any[]): boolean {
        const { __events } = this;
        const listeners = __events.get(event);

        if (Array.isArray(listeners)) {
            while (listeners.length) {
                const listener = listeners.pop();

                if (listener) listener(args);
            }
        }

        return __events.has(event);
    }

    public once(event: string | symbol, listener: Callback): this {
        const { __events } = this;
        const once = (): void => {
            const listeners = __events.get(event) || [];

            listeners.push(listener);
            __events.set(event, listeners);
        };

        switch (event) {
            case 'data':
                once();
                break;
            default:
                throw new Error(`Event handling not implemented`);
        }

        return this;
    }
}