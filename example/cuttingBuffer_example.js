import { cuttingBuffer } from '../build/index.js';

const buffer = Buffer.from('abcde');
// <Buffer 61 62 63 64 65>
let r = cuttingBuffer(buffer, { deepCopy: true, length: 2 });
console.log(r);
// [ <Buffer 61 62>, <Buffer 63 64>, <Buffer 65> ]
r = cuttingBuffer(buffer);
console.log(r);
// [ <Buffer 61 62 63 64 65> ]
