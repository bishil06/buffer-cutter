interface cutBufferOption {
  deepCopy?: boolean;
  start?: number;
  end?: number;
}

export function cutBuffer(
  buf: Buffer,
  opt: cutBufferOption = { deepCopy: true }
): Buffer {
  const start = opt.start !== undefined ? opt.start : 0;
  const end = opt.end !== undefined ? opt.end : buf.length;
  const length = buf.length < end ? buf.length - start : end - start;

  if (length < 0)
    throw Error(`start = ${start}, end = ${end} end must bigger than start`);

  if (opt.deepCopy === true) {
    const result = Buffer.alloc(length);
    buf.copy(result, 0, start, start + length);
    return result;
  }

  return buf.subarray(start, start + length);
}

interface cuttingBufferOption {
  deepCopy?: boolean;
  length?: number;
}

export function cuttingBuffer(
  buf: Buffer,
  opt: cuttingBufferOption = { deepCopy: true }
): Buffer[] {
  const result: Buffer[] = [];

  if (opt.length !== undefined) {
    if (opt.length <= 0) {
      throw new Error(`length = ${opt.length} length must bigger than 0`);
    }

    for (let i = 0; i < buf.length; ) {
      result.push(
        cutBuffer(buf, {
          deepCopy: opt.deepCopy,
          start: i,
          end: (i += opt.length),
        })
      );
    }

    return result;
  }
  return [buf];
}

interface cuttingAsyncIterBufferOption extends cuttingBufferOption {
  timeOut?: number;
}

interface forAwaitOfAble {
  [Symbol.asyncIterator](): AsyncIterableIterator<Buffer>;
}

export async function* cuttingAsyncIterBuffer(
  asyncIterBuf: forAwaitOfAble,
  opt: cuttingAsyncIterBufferOption = { deepCopy: true }
): AsyncGenerator<Buffer, void, undefined> {
  let tmpBuffers: Buffer[] = [];
  let tmpTotalSize = 0;
  // eslint-disable-next-line no-restricted-syntax
  if (opt.length !== undefined) {
    // eslint-disable-next-line no-restricted-syntax
    for await (const chunk of asyncIterBuf) {
      tmpBuffers.push(chunk);
      tmpTotalSize += chunk.length;

      if (tmpTotalSize > opt.length) {
        const buffers = cuttingBuffer(Buffer.concat(tmpBuffers), {
          deepCopy: opt.deepCopy,
          length: opt.length,
        });

        const isRest = buffers.length % opt.length !== 0;
        const loopTimes = isRest ? buffers.length - 1 : buffers.length;

        for (let i = 0; i < loopTimes; i += 1) {
          yield buffers[i];
        }

        if (isRest) {
          tmpBuffers = [buffers[buffers.length - 1]];
          tmpTotalSize = tmpBuffers.reduce((sum, buf) => sum + buf.length, 0);
        } else {
          tmpBuffers = [];
          tmpTotalSize = 0;
        }
      }
    }
  } else throw new Error('no length');

  if (tmpBuffers.length > 0) yield* tmpBuffers;
}

export const cuttingRStream = cuttingAsyncIterBuffer;
