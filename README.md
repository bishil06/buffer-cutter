# buffer-cutter
Cut buffer to length or something(not developed...)

## cutBuffer
```js
import { cutBuffer } from 'buffer-cutter';

const buffer = Buffer.from('abcde');
// <Buffer 61 62 63 64 65>
cutBuffer(buffer, { deepCopy: true, start: 0, end: 3 });
// <Buffer 61 62 63>
```

## cuttingBuffer
```js
import { cuttingBuffer } from 'buffer-cutter';

const buffer = Buffer.from('abcde');
// <Buffer 61 62 63 64 65>
cuttingBuffer(buffer, { deepCopy: true, length: 2 });
// [ <Buffer 61>, <Buffer 62>, <Buffer 63>, <Buffer 64>, <Buffer 65> ]
```