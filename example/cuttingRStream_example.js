import { Readable } from 'stream';

import { cuttingRStream } from '../index.js';

const buffer = Buffer.from('abcdefghi');
// <Buffer 61 62 63 64 65 66 67 68 69>
const bufStream = Readable.from(buffer);
// readalbe
for await (const c of cuttingRStream(bufStream, { length: 2 })) {
  console.log(c);
}
// <Buffer 61 62 63>
// <Buffer 64 65 66>
// <Buffer 67 68 69>
