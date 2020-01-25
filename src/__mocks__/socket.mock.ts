/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */

type MockCallback = (...args: any[]) => void;

export class MockSocket {
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

    public addListener(event: string | symbol, listener: MockCallback): this {
        throw new Error('Method not implemented.');
    }

    public on(event: string | symbol, listener: MockCallback): this {
        throw new Error('Method not implemented.');
    }

    public once(event: string | symbol, listener: MockCallback): this {
        throw new Error('Method not implemented.');
    }

    public removeListener(event: string | symbol, listener: MockCallback): this {
        throw new Error('Method not implemented.');
    }

    public off(event: string | symbol, listener: MockCallback): this {
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

    public prependListener(event: string | symbol, listener: MockCallback): this {
        throw new Error('Method not implemented.');
    }

    public prependOnceListener(event: string | symbol, listener: MockCallback): this {
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
