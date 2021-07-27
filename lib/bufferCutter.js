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
