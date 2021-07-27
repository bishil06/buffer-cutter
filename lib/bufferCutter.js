export function cutBuffer(buf, opts) {
  const { deepCopy = true, start, end } = opts;
  const length = buf.length < end ? buf.length - start : end - start;

  if (deepCopy) {
    const result = Buffer.alloc(length);
    buf.copy(result, 0, start, start + length);
    return result;
  }

  return buf.subarray(start, start + length);
}

export function cuttingBuffer(buffer, opts) {
  const result = [];
  const { length, deepCopy = true } = opts;

  for (let i = 0; i < buffer.length; ) {
    result.push(cutBuffer(buffer, { deepCopy, start: i, end: (i += length) }));
  }

  return result;
}

export async function* cuttingRStream(readable, opts) {
  const { length, deepCopy = true } = opts;

  let tmpBuffers = [];
  let tmpTotalSize = 0;
  // eslint-disable-next-line no-restricted-syntax
  for await (const chunk of readable) {
    tmpBuffers.push(chunk);
    tmpTotalSize += chunk.length;

    if (tmpTotalSize > length) {
      const buffers = cuttingBuffer(Buffer.concat(tmpBuffers), {
        deepCopy,
        length,
      });
      const isRest = buffers.length % length !== 0;
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
  if (tmpBuffers.length > 0) yield* tmpBuffers;
}
