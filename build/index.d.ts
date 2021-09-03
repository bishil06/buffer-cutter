/// <reference types="node" />
interface cutBufferOption {
    deepCopy?: boolean;
    start?: number;
    end?: number;
}
export declare function cutBuffer(buf: Buffer, opt?: cutBufferOption): Buffer;
interface cuttingBufferOption {
    deepCopy?: boolean;
    length?: number;
}
export declare function cuttingBuffer(buf: Buffer, opt?: cuttingBufferOption): Buffer[];
interface cuttingAsyncIterBufferOption extends cuttingBufferOption {
    timeOut?: number;
}
interface forAwaitOfAble {
    [Symbol.asyncIterator](): AsyncIterableIterator<Buffer>;
}
export declare function cuttingAsyncIterBuffer(asyncIterBuf: forAwaitOfAble, opt?: cuttingAsyncIterBufferOption): AsyncGenerator<Buffer, void, undefined>;
export declare const cuttingRStream: typeof cuttingAsyncIterBuffer;
export {};
//# sourceMappingURL=index.d.ts.map