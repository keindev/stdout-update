import readline from 'readline';
import { strict } from 'assert';

type StreamWriteBuffer = Buffer | Uint8Array;
type StreamWriteData = string | StreamWriteBuffer;
type StreamWriteDataEncoding = string | undefined;
type StreamWriteFunctionCallback = ((err?: Error | null | undefined) => void) | undefined;
type StreamWriteFunction = {
    (buffer: StreamWriteData, cb?: StreamWriteFunctionCallback): boolean;
    (str: string, encoding?: StreamWriteDataEncoding, cb?: StreamWriteFunctionCallback): boolean;
};

const stream: NodeJS.WritableStream = process.stdout;

export class OutputUpdate {
    private static instance: OutputUpdate;
    private write: StreamWriteFunction;
    private story: [StreamWriteBuffer, StreamWriteFunctionCallback] = [];

    private constructor() {
        this.write = stream.write;
    }

    public static getInstance(): OutputUpdate {
        if (!OutputUpdate.instance) {
            OutputUpdate.instance = new OutputUpdate();
        }

        return OutputUpdate.instance;
    }

    public hook() {
        this.write = stream.write;
        stream.write = (data: StreamWriteData, ...args: any): boolean => {
            return typeof data === 'string' ? this.output(data) : this.save(data, args[0]);
        };
    }

    public unhook() {
        stream.write = this.write;
    }

    public update() {}

    private output(str: string, encoding?: StreamWriteDataEncoding, cb?: StreamWriteFunctionCallback): boolean {
        return this.write.apply(stream, [str, encoding, cb]);
    }

    private save(buffer: StreamWriteBuffer, cb?: StreamWriteFunctionCallback): boolean {
        this.story.push(...arguments);

        return true;
    }
}

/*
stream.cork();
stream.write(writed.join('\n'));
process.nextTick(() => stream.uncork());
*/
