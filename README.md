# buffer-cutter
Cut buffer to length or something(not developed...)

## cutBuffer
Cut a specific part of the buffer and get it  
```js
import { cutBuffer } from 'buffer-cutter';

const buffer = Buffer.from('abcde');
// <Buffer 61 62 63 64 65>
cutBuffer(buffer, { deepCopy: true, start: 0, end: 3 });
// <Buffer 61 62 63>
```

## cuttingBuffer
Cut the buffer into a specific unit and bring it as an iterable  
```js
import { cuttingBuffer } from 'buffer-cutter';

const buffer = Buffer.from('abcde');
// <Buffer 61 62 63 64 65>
cuttingBuffer(buffer, { deepCopy: true, length: 2 });
// [ <Buffer 61 62>, <Buffer 63 64>, <Buffer 65> ]
```

## cuttingRStream
Cut the buffer output of Readable Stream  
```js
import { Readable } from 'stream';

import { cuttingRStream } from 'buffer-cutter';

const buffer = Buffer.from('abcdefghi');
// <Buffer 61 62 63 64 65 66 67 68 69>
const bufStream = Readable.from(buffer);
// readalbe
for await (const c of cuttingRStream(bufStream, { length: 3 })) {
  console.log(c);
}
// <Buffer 61 62 63>
// <Buffer 64 65 66>
// <Buffer 67 68 69>
```