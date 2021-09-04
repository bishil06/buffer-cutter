/// <reference types="node" />
interface optionalDeepCopy {
    deepCopy?: boolean;
}
interface optionalStart {
    start?: number;
}
interface optionalEnd {
    end?: number;
}
interface cutBufferOption extends optionalDeepCopy, optionalStart, optionalEnd {
}
export declare function cutBuffer(buf: Buffer): Buffer;
export declare function cutBuffer(buf: Buffer, opt: optionalDeepCopy): Buffer;
export declare function cutBuffer(buf: Buffer, opt: optionalStart): Buffer;
export declare function cutBuffer(buf: Buffer, opt: optionalEnd): Buffer;
export declare function cutBuffer(buf: Buffer, opt: cutBufferOption): Buffer;
interface optionalLength {
    length?: number;
}
interface cuttingBufferOption extends optionalDeepCopy, optionalLength {
}
export declare function cuttingBuffer(buf: Buffer): Buffer[];
export declare function cuttingBuffer(buf: Buffer, opt: cuttingBufferOption): Buffer[];
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