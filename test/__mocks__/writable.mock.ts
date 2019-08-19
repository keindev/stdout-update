/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { MockSocket } from './socket.mock';

export class MockWritable extends MockSocket {
    public writableHighWaterMark = 0;
    public writableLength = 0;

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
